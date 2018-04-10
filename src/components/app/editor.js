import React, { Component } from 'react';
import E from 'wangeditor'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import axios from 'axios'
import copy from 'copy-to-clipboard'

import { Button, notification, Spin, Table, Modal, Input, Icon, Select } from 'antd'

import picUrl from '../imagesUrl/url.json'
import './editor.less'

const confirm = Modal.confirm;
let editor = null;
class Editor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: '0',
            spinLoading: true,//整个界面loading效果
            loadingList: false,//翻页的时候调用加载动画
            buttonLoading: false,//点击保存按钮的时候
            saveButtonLoading: false,//编辑之后保存文章
            pasteFilterStyle: false,//设置是删除粘贴进来的样式，默认不删除
            showEditor: false,//是否显示编辑器
            showAddModal: false,//是否显示添加新闻，默认不显示
            newsTitle: '',//文章标题
            curEditorId: null,//当前编辑文章的id
            curEditorContent: null,//当前编辑文章的标签数据
            curEditorTitle: null,//当前编辑文章的标题
            defaultType: "WEB",//默认的类型
            pagination: {
                current: 1,
                pageSize: 10,
                total: 10
            },
            typeList: ['WEB', 'APP'],
            breadcrumbList: [
                {
                    title: '首页',
                    href: '#/main/index',
                }, {
                    title: '内容管理',
                }, {
                    title: '富文本编辑器',
                }],
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                render: (item, record) => <a title="点击编辑标题" onClick={() => { this.editorTitle(record) }}>{item}</a>
            }, {
                title: '网址链接',
                dataIndex: 'url',
                key: 'url',
                render: item => <a className="htmlUrl" title="跳转到链接" href={item} target="_blank">{item}</a>
            }, {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            }, {
                title: '创建者',
                dataIndex: 'creater',
                key: 'creater'
            }, {
                title: '最后编辑者',
                dataIndex: 'lastEditer',
                key: 'lastEditer'
            }, {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                render: (item) => item ? <span>{this.formatDate(item)}</span> : ''
            }, {
                title: '最后编辑时间',
                dataIndex: 'gmtModified',
                key: 'gmtModified',
                render: (item) => item ? <span>{this.formatDate(item)}</span> : ''
            }, {
                title: '编辑',
                key: 'action',
                width: 200,
                fixed: 'right',
                render: (item, record) => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={() => this.beginEditor(record)}>打开编辑器</a>
                            &nbsp;|&nbsp;
                            <a href="javascript:;" onClick={() => this.removeNews(record)}>删除</a>
                        </div>
                    )
                }
            }],
            itemList: []

        }
    }
    render() {
        let { breadcrumbList, spinLoading, buttonLoading, showEditor, itemList, columns, pagination, curEditorContent, curEditorTitle, saveButtonLoading, defaultType, typeList } = this.state

        return (
            <div id="editorContainer">
                <PageHeader
                    title="富文本编辑器"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={breadcrumbList}
                    content=""
                    action={<Button type="primary" onClick={this.addNews}>新增</Button>}
                />
                {/* 将生成编辑器 */}
                <Spin size="large" spinning={spinLoading} >

                    <div className="tableBox">
                        <div className={showEditor ? 'hideEditor' : ''}>
                            <Table columns={columns} dataSource={itemList} bordered rowKey={record => record.id}
                                pagination={pagination}
                                onChange={this.handleTableChange}
                                loading={this.state.loading}
                                scroll={{ x: 2000 }}
                            />
                        </div>
                        <div className={showEditor ? '' : 'hideEditor'}>
                            <div id="editorBox" ref="editorElem" style={{ textAlign: 'left' }}>

                            </div>
                            <div className="footBtnGroup">
                                <Button id='save' type='primary' loading={saveButtonLoading} onClick={this.saveEditor}>保存</Button>
                                <Button onClick={this.backToEditorList}>返回</Button>
                            </div>
                        </div>
                    </div>
                </Spin>

                {/* 添加新闻 */}
                <Modal
                    title="新增文章列表"
                    visible={this.state.showAddModal}
                    onOk={() => {
                        this.sureAddNews()
                    }}
                    onCancel={() => {
                        this.setState({
                            showAddModal: false,
                            newsTitle: '',
                        })
                    }}
                    footer={[
                        <Button key="back" onClick={this.cancelAddNews}>取消</Button>,
                        <Button key="submit" type="primary" loading={buttonLoading} onClick={this.sureAddNews}>
                            确定
                        </Button>,
                    ]}
                >
                    <label>标题：</label><Input type='text' ref='title' onInput={this.inputTitle} style={{ width: "80%", marginRight: "2%", marginLeft: "2%", marginBottom: 20 }} />
                    <br />
                    <label>类型：</label>
                    <Select defaultValue={defaultType} style={{ width: "80%", marginRight: "2%", marginLeft: "2%", marginBottom: 20 }} onChange={this.changeSelect}>
                        {
                            typeList.map((item, index) => {
                                return (
                                    <Select.Option key={index} value={item}>{item}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Modal>
                {/* 添加新闻 */}
                <Modal
                    title="修改标题窗口"
                    visible={this.state.showEditorTitleModal}
                    onOk={() => {
                        this.sureEditorTitle()
                    }}
                    onCancel={() => {
                        this.setState({
                            showEditorTitleModal: false,
                        })
                    }}
                    footer={[
                        <Button key="back" onClick={this.cancelEditorTitle}>取消</Button>,
                        <Button key="submit" type="primary" loading={buttonLoading} onClick={this.sureEditorTitle}>
                            确定
                        </Button>,
                    ]}
                >
                    <label>标题：</label><Input type='text' ref='editorTitle' value={curEditorTitle} onChange={this.inputEditorTitle} onInput={this.inputEditorTitle} style={{ width: "80%", marginRight: "2%", marginLeft: "2%", marginBottom: 20 }} />
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.initPage()
        this.initEditor()
    }

    //初始化页面
    initPage = async () => {
        this.setState({
            spinLoading: true
        })

        let obj = await axios({
            method: "POST",
            url: "/textedit/query",
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            params: {
                pageNum: this.state.pagination.current,
                pageSize: this.state.pagination.pageSize
            }
        })
        if (obj.data.code == 0) {
            let res = obj.data.data
            this.state.pagination.total = res.total;
            setTimeout(() => {
                this.setState({
                    itemList: res.result,
                    pagination: this.state.pagination,
                    spinLoading: false,
                    showEditor: false
                })
            }, 500)

        } else {
            this.setState({
                spinLoading: false
            })
            this.error('error', obj.data.message)
        }
    }
    //初始化编辑器
    initEditor = () => {
        const _this = this
        const elem = document.querySelector("#editorBox")
        editor = new E(elem)
        editor.customConfig.zIndex = 100//配置z-index
        // 关闭粘贴样式的过滤
        editor.customConfig.pasteFilterStyle = _this.state.pasteFilterStyle
        // editor.customConfig.lang = {
        //     '设置标题': 'title',
        //     '正文': 'p',
        //     '链接文字': 'link text',
        //     '链接': 'link',
        //     '上传图片': 'upload image',
        //     '上传': 'upload',
        //     '创建': 'init'
        //     // 还可自定添加更多
        // }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
            console.log("10秒后没有操作自动保存");
        }
        // 在10秒没有任何操作的情况下会自动调用onchange⌚️自动保存
        editor.customConfig.onchangeTimeout = 10000 // 单位 ms
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.uploadImgServer = picUrl.url// 上传图片到服务器
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                console.log(xhr);
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                console.log(result);

            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                _this.openNotificationWithIcon('error', "图片上传失败")
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                _this.openNotificationWithIcon('error', "图片上传超时")
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                console.log(result);
                var url = result.data.path
                insertImg(url)
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }

        editor.create()
    }

    //=====================编辑标题===========================
    editorTitle = async (record) => {

        let obj = await axios({
            method: "POST",
            url: "/textedit/queryById",
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            params: {
                id: record.id
            }
        })
        if (obj.data.code == 0) {
            this.setState({
                curEditorContent: obj.data.data.code,
                curEditorId: record.id,
                curEditorTitle: record.title,
                showEditorTitleModal: true,
            })
        } else {
            this.openNotificationWithIcon('error', obj.data.message)
        }
    }

    //取消编辑标题
    cancelEditorTitle = () => {
        this.refs.editorTitle.input.value = '';
        this.setState({ showEditorTitleModal: false })
    }

    //输入编辑
    inputEditorTitle = (e) => {
        this.setState({
            curEditorTitle: e.target.value
        })
    }

    //编辑标题后点击确定
    sureEditorTitle = async () => {
        this.setState({
            buttonLoading: true
        })
        let obj = await axios({
            method: "POST",
            url: "/textedit/edit",
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            data: {
                id: this.state.curEditorId,
                code: this.state.curEditorContent,
                title: this.state.curEditorTitle
            }
        })
        console.log('点击保存文章后返回的数据', obj);
        this.setState({
            buttonLoading: false,
            showEditorTitleModal: false,
        })
        if (obj.data.code == 0) {
            this.initPage()
            this.openNotificationWithIcon('success', '修改标题成功')
        } else {
            this.openNotificationWithIcon('error', obj.data.message)
        }
    }

    //点击保存按钮
    saveEditor = async () => {
        this.setState({
            saveButtonLoading: true
        })
        console.log(editor.txt.html());
        let obj = await axios({
            method: "POST",
            url: "/textedit/edit",
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            data: {
                id: this.state.curEditorId,
                code: editor.txt.html(),
                title: this.state.curEditorTitle
            }
        })
        console.log('点击保存文章后返回的数据', obj);
        if (obj.data.code == 0) {
            setTimeout(() => {
                this.setState({
                    showEditor: false,
                    saveButtonLoading: false
                })
                this.initPage()
                this.openNotificationWithIcon('success', '保存成功')
            }, 1000)
        } else {
            setTimeout(() => {
                this.setState({
                    saveButtonLoading: false
                })
                this.openNotificationWithIcon('error', obj.data.message)
            }, 1000)
        }
    }


    // 翻页
    handleTableChange = (pagination) => {
        this.state.pagination.current = pagination.current
        this.state.pagination.total = pagination.total
        this.setState({
            pagination: this.state.pagination
        });
        this.initPage()
    }
    //打开编辑器
    beginEditor = async (record) => {

        this.setState({
            spinLoading: true
        })
        let obj = await axios({
            method: "POST",
            url: "/textedit/queryById",
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            params: {
                id: record.id
            }
        })
        console.log('点击编辑文章后返回的数据', obj);
        if (obj.data.code == 0) {
            setTimeout(() => {
                this.setState({
                    spinLoading: false,
                    showEditor: true,
                    curEditorContent: obj.data.data.code,
                    curEditorId: record.id,
                    curEditorTitle: record.title
                })
            }, 500)
            editor.txt.html(obj.data.data.code)
        } else {
            setTimeout(() => {
                this.setState({
                    spinLoading: false,
                })
                this.openNotificationWithIcon('error', obj.data.message)
            }, 500)
        }
    }
    //===============添加新闻=========================
    addNews = () => {
        this.setState({
            showAddModal: true
        })
    }
    //输入标题
    inputTitle = (e) => {
        this.setState({
            newsTitle: e.target.value
        })
    }
    //选择类型
    changeSelect = (value) => {
        this.state.defaultType = value
        this.setState({
            defaultType: value
        })
    }
    //添加新闻点击ok后的回掉
    sureAddNews = async (e) => {
        console.log('点击确定添加标题', this.state.newsTitle);
        console.log("添加的类型是", this.state.defaultType);
        if (this.state.newsTitle) {
            this.setState({
                buttonLoading: true
            })
            let obj = await axios({
                method: "POST",
                url: "/textedit/create",
                headers: {
                    accessKey: JSON.parse(sessionStorage.item).data.accessKey
                },
                data: {
                    title: this.state.newsTitle,
                    code: '',
                    type: this.state.defaultType
                }
            })
            console.log('添加文章后返回的数据', obj);
            if (obj.data.code == 0) {
                setTimeout(() => {
                    this.setState({
                        showAddModal: false,
                        buttonLoading: false,
                        newsTitle: '',
                    })
                    this.refs.title.input.value = '';
                    this.initPage()
                    this.openNotificationWithIcon('success', '添加成功')
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        showAddModal: false,
                        buttonLoading: false,
                        newsTitle: '',
                    })
                    this.refs.title.input.value = '';
                    this.openNotificationWithIcon('error', obj.data.message)
                    this.initPage()
                }, 500)
            }
        } else {
            this.openNotificationWithIcon('warning', '标题输入不能为空！')
        }
    }
    //取消添加新闻
    cancelAddNews = (e) => {
        this.refs.title.input.value = '';
        this.setState({ showAddModal: false, newsTitle: '' })
    }
    //删除新闻
    removeNews = (record) => {
        console.log(record);
        let _this = this
        confirm({
            title: '你确定删除此文章吗?',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                _this.setState({
                    buttonLoading: true,
                })
                let obj = await axios({
                    method: "POST",
                    url: "/textedit/delete",
                    headers: {
                        accessKey: JSON.parse(sessionStorage.item).data.accessKey
                    },
                    params: {
                        id: record.id
                    }
                })
                console.log('删除文章后返回的数据', obj);
                if (obj.data.code == 0) {
                    setTimeout(() => {
                        _this.setState({
                            showAddModal: false,
                            buttonLoading: false,
                        })
                        _this.initPage()
                        _this.openNotificationWithIcon('success', '删除成功')
                    }, 500)
                } else {
                    setTimeout(() => {
                        this.setState({
                            showAddModal: false,
                            buttonLoading: false,
                            newsTitle: '',
                        })
                        this.refs.title.input.value = '';
                        this.openNotificationWithIcon('error', obj.data.message)
                        this.initPage()
                    }, 500)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 返回编辑列表
    backToEditorList = () => {

        this.setState({
            spinLoading: true
        })
        setTimeout(() => {
            this.setState({
                spinLoading: false,
                showEditor: false
            })
        }, 1000)
    }

    //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };

    //转换时间戳
    formatDate = (time) => {
        let now = new Date(time)
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        if (month < 10) {
            month = "0" + month
        }
        if (date < 10) {
            date = "0" + date
        }
        if (hour < 10) {
            hour = "0" + hour
        }
        if (minute < 10) {
            minute = "0" + minute
        }
        if (second < 10) {
            second = "0" + second
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    //复制图片地址
    copySrc(src) {
        copy(src);
        this.openNotificationWithIcon("success", "复制地址成功")
    };
}

export default Editor;

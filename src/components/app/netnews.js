
import React from 'react'
import { Table, Button, Input, Modal, Radio, Form, Icon, Checkbox, Popconfirm, Tabs, Upload } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { connect } from 'react-redux'
import picUrl from '../imagesUrl/url.json'

require("./netnews.less")
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
    </div>
);
import { getNetnewsList, getNetnewsList1, addNetnewsList, addNetnewsList1, changeNetnewsList, changeNetnewsList1, removeNetnewsList, } from "../../redux/actions/acApp/acNetnews";

class Netnews extends React.Component {

    state = {
        data: [],
        data1: [],
        loading: false,
        activeKey: '1',
        ErMsg: '',
        ErMsg1: '',
        modalTitle: '',
        modalTitle1: '',
        modalvisible: false,
        modalvisible1: false,
        changeID: '',
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            },
            {
                title: '内容管理',
            },
            {
                title: '新闻资讯',
            }
        ],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        pagination1: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        columns: [
            {
                title: "排序",
                dataIndex: "top",
            },

            {
                title: "标题",
                dataIndex: 'title',
            },

            {
                title: "链接",
                dataIndex: "url",
                render: (text) =>
                    <div>
                        <a href={text} target="_blank">{text}</a>
                    </div>
            },
    
            {
                title: "操作",
                key: "action",
                render: (record) => <div>
                    <a href="javascript:;" onClick={() => this.changeIt(record)}>修改</a>
                    丨
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeIt(record)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>
            }],
        columns1: [
            {
                title: "排序",
                dataIndex: "top",
            },

            {
                title: "标题",
                dataIndex: 'title',
            },
            {
                title: "图片",
                dataIndex: "image",
                render: (text) =>
                    <div>
                        <a href={text} target="_blank">{text}</a>
                    </div>
            },
            {
                title: "链接",
                dataIndex: "url",
                render: (text) =>
                    <div>
                        <a href={text} target="_blank">{text}</a>
                    </div>
            },
            {
                title: "操作",
                key: "action",
                render: (record) => <div>
                    <a href="javascript:;" onClick={() => this.changeIt1(record)}>修改</a>
                    丨
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeIt(record)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>
            },],
        itemImgUrl: null,
        fileList: [],
        uploadImgs: []

    }
    //换页
    handleTableChange = (pagination) => {
        setTimeout(() => {
            getNetnewsList(pagination.current, this.state.pagination.pageSize, (action) => {
                this.props.dispatch(action);
                console.log(this.props.netnewsList)
                if (this.props.netnewsList.code == 0) {
                    this.setState({
                        data: this.props.netnewsList.data.result,
                        pagination: {
                            current: this.props.netnewsList.data.pageNo,
                            total: this.props.netnewsList.data.total,
                            pageSize: this.props.netnewsList.data.pageSize,
                        },
                    })
                }
            })
        }, 200);

    };
    //下面函数时为了切换TABS
    tabsOnChange = (key) => {
        if (key == "1") {
            this.setState({
                activeKey: "1"
            });
        } else {
            this.setState({
                activeKey: "2"
            });
        }
        // console.log(key)
    }

    refresh = () => {
        this.setState({ loading: true });
        getNetnewsList(1, this.state.pagination.pageSize, (action) => {
            this.props.dispatch(action);
            console.log(this.props.netnewsList)
            if (this.props.netnewsList.code == 0) {
                this.setState({
                    loading: false,
                    data: this.props.netnewsList.data.result,
                    pagination: {
                        current: this.props.netnewsList.data.pageNo,
                        total: this.props.netnewsList.data.total,
                        pageSize: this.props.netnewsList.data.pageSize,
                    },
                })
            }
        })
        getNetnewsList1(1, this.state.pagination1.pageSize, (action) => {
            this.props.dispatch(action);
            console.log(this.props.netnewsList)
            if (this.props.netnewsList.code == 0) {
                this.setState({
                    loading: false,
                    data1: this.props.netnewsList.data.result,
                    pagination1: {
                        current: this.props.netnewsList.data.pageNo,
                        total: this.props.netnewsList.data.total,
                        pageSize: this.props.netnewsList.data.pageSize,
                    },
                })
            }
        })

    }
    componentDidMount = () => {
        this.refresh()
    }

    render() {
        return <div>
            <PageHeader className="UsersPageHeader"
                title="新闻资讯"
                logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                breadcrumbList={this.state.breadcrumbList}
                extraContent={<div className="extraContent"></div>}
                action={<div className="action">
                    <Button type='primary' onClick={this.addIt}>新增资讯</Button>
                </div>}
            />
            <div id="bodyDivNet" className="tableBox">
                <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                    <TabPane tab="文章管理" key="1">
                        <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                            bordered
                        />
                    </TabPane>
                    <TabPane tab='图片管理' key="2" >
                        <Table columns={this.state.columns1} dataSource={this.state.data1} rowKey={record => record.id}
                            pagination={this.state.pagination1}
                            loading={this.state.loading1}
                            onChange={this.handleTableChange1}
                            bordered
                        />
                    </TabPane>
                </Tabs>
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.modalvisible}
                    onOk={this.modalOk}
                    onCancel={this.modalCa}
                >
                    <p style={{ marginLeft: 20 }}><label>排序：</label><Input ref='top' style={{ width: "66%" }} type='text' /></p>
                    <p style={{ marginLeft: 20 }}><label>标题：</label><Input ref='title' style={{ width: "66%" }} type='text' /></p>
                    <p style={{ marginLeft: 20 }}><label>链接：</label><Input ref='url' style={{ width: "66%" }} type='text' /></p>
                    <p style={{ marginLeft: 70, color: 'red' }}>{this.state.ErMsg}</p>
                </Modal>
                <Modal
                    title={this.state.modalTitle1}
                    visible={this.state.modalvisible1}
                    onOk={this.modalOk1}
                    onCancel={this.modalCa1}
                >
                    <p style={{ marginLeft: 20 }}><label>排序：</label><Input ref='top1' style={{ width: "66%" }} type='text' /></p>
                    <p style={{ marginLeft: 20 }}><label>标题：</label><Input ref='title1' style={{ width: "66%" }} type='text' /></p>

                    <p style={{ marginLeft: 20 }}><label>链接：</label><Input ref='url1' style={{ width: "66%" }} type='text' /></p>
                    <img style={{ width: '100px', margin: ' 20px 0 20px 24px', display: this.state.uploadImgs.length < 1 ? 'block' : "none" }} src={this.state.itemImgUrl} />
                    <Upload className="modalUpload"
                        action={picUrl.url}
                        listType="picture-card"
                        fileList={this.state.fileList}
                        onChange={this.handleChangePic}
                        onRemove={this.handleRemovePic}
                    // onPreview={this.handlePreview}
                    >
                        {this.state.uploadImgs.length < 1 ? uploadButton : ''}
                    </Upload>

                    <p style={{ marginLeft: 70, color: 'red', marginTop: 20 }}>{this.state.ErMsg1}</p>
                </Modal>
            </div >

        </div>


    }

    //图片上传的操作
    handleChangePic = (info) => {
        if (info.file.status === 'done') {
            this.state.uploadImgs.push(info.file.response.data.path)
        } else if (info.file.status === 'error') {
            this.openNotificationWithIcon("error", "上传图片失败")
        }
        this.setState({ fileList: info.fileList })
    }
    handleRemovePic = (info) => {
        for (let i = 0; i < this.state.uploadImgs.length; i++) {
            if (this.state.uploadImgs[i] == info.response.data.path) {
                this.state.uploadImgs.splice(i, 1)
                break;
            }
        }
        this.setState({
            uploadImgs: this.state.uploadImgs
        })
    }



    changeIt = (record) => {
        console.log(record.id)
        setTimeout(() => {
            this.setState({
                modalvisible: true,
                modalTitle: '修改文章',
                changeID: record.id
            })
            this.refs.top.input.value = record.top
            this.refs.title.input.value = record.title
            this.refs.url.input.value = record.url
        }, 500);
    }
    changeIt1 = (record) => {
        console.log(record.id)
        setTimeout(() => {
            this.setState({
                modalvisible1: true,
                modalTitle1: '修改图片',
                changeID: record.id,
                itemImgUrl: record.image
            })
            this.refs.top1.input.value = record.top
            this.refs.title1.input.value = record.title
            this.refs.url1.input.value = record.url
        }, 500);
    }
    removeIt = (record) => {
        removeNetnewsList(record.id, (action) => {
            this.props.dispatch(action)
            if (this.props.netnewsList.code == 0) {
                this.refresh()
            }
        })
    }

    addIt = () => {
        if (this.state.activeKey == '1') {
            this.setState({
                modalvisible: true,
                modalTitle: '新增文章'
            })
        } else if (this.state.activeKey == '2') {
            this.setState({
                modalvisible1: true,
                modalTitle1: '新增图片'
            })
        }
    }

    modalOk = () => {
        if (this.refs.title.input.value.length == 0 || this.refs.url.input.value.length == 0) {
            this.setState({
                ErMsg: '标题或者链接不能为空！'
            })
            return
        }
        if (this.state.modalTitle == '新增文章') {
            let item = {
                top: this.refs.top.input.value,
                title: this.refs.title.input.value,
                url: this.refs.url.input.value
            }
            addNetnewsList(item, (action) => {
                this.props.dispatch(action)
                if (this.props.netnewsList.code == 0) {
                    this.refresh()
                    this.modalCa()
                } else if (this.props.netnewsList.code > 0) {
                    this.setState({
                        ErMsg: this.props.netnewsList.message
                    })
                }
            })
        } else if (this.state.modalTitle == '修改文章') {
            let item = {
                top: this.refs.top.input.value,
                title: this.refs.title.input.value,
                url: this.refs.url.input.value,
                id: this.state.changeID
            }
            changeNetnewsList(item, (action) => {
                this.props.dispatch(action)
                if (this.props.netnewsList.code == 0) {
                    this.refresh()
                    this.modalCa()
                } else if (this.props.netnewsList.code > 0) {
                    this.setState({
                        ErMsg: this.props.netnewsList.message
                    })
                }
            })
        }

    }
    modalOk1 = () => {
        if (this.refs.title1.input.value.length == 0 || this.refs.url1.input.value.length == 0) {
            this.setState({
                ErMsg1: '标题或者链接不能为空！'
            })
            return
        }
        if (this.state.uploadImgs.length == 0 && !this.state.itemImgUrl) {
            this.setState({
                ErMsg1: '必须上传图片！'
            })
            return
        }
        if (this.state.modalTitle1 == '新增图片') {
            let item = {
                top: this.refs.top1.input.value,
                title: this.refs.title1.input.value,
                url: this.refs.url1.input.value,
                image: this.state.uploadImgs[0]
            }
            addNetnewsList1(item, (action) => {
                this.props.dispatch(action)
                console.log(this.props.netnewsList)
                if (this.props.netnewsList.code == 0) {
                    this.refresh()
                    this.modalCa1()
                } else if (this.props.netnewsList.code > 0) {
                    this.setState({
                        ErMsg1: this.props.netnewsList.message
                    })
                }
            })
        } else if (this.state.modalTitle1 == '修改图片') {
            let item = {
                top: this.refs.top1.input.value,
                title: this.refs.title1.input.value,
                url: this.refs.url1.input.value,
                id: this.state.changeID,
                image: this.state.uploadImgs.length == 1 ? this.state.uploadImgs[0] : this.state.itemImgUrl,
            }
            console.log(item)
            changeNetnewsList1(item, (action) => {
                this.props.dispatch(action)
                console.log(this.props.netnewsList)
                if (this.props.netnewsList.code == 0) {
                    this.refresh()
                    this.modalCa1()
                } else if (this.props.netnewsList.code > 0) {
                    this.setState({
                        ErMsg1: this.props.netnewsList.message
                    })
                }
            })
        }

    }

    modalCa = () => {
        this.refs.top.input.value = ''
        this.refs.title.input.value = ''
        this.refs.url.input.value = ''
        this.setState({
            modalvisible: false,
            ErMsg: ''
        })
    }
    modalCa1 = () => {
        this.refs.top1.input.value = ''
        this.refs.title1.input.value = ''
        this.refs.url1.input.value = ''
        this.setState({
            modalvisible1: false,
            ErMsg1: '',
            uploadImgs: [],
            fileList: [],
            itemImgUrl: null,
        })
    }
}
function filterCheckPendingList(store) {
    // console.log(store);
    return {
        netnewsList: store.netnewsList
    }
}

export default connect(filterCheckPendingList)(Netnews)
import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, Upload, notification } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import picUrl from '../imagesUrl/url.json'
import { getSlideList, addSlideList, changeSlideList, removeSlideList } from "../../redux/actions/acApp/acSlide";


require("./slide.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
    </div>
);


class Slide extends React.Component {


    state = {
        activeKey: "1",
        tab2Name: '新增配置',
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: 'APP管理',
            }, {
                title: '轮播图管理',
            }],

        columns: [
            {
                title: "跳转方式",
                dataIndex: "jumpType",
                render: (text) =>
                    <div>{
                        text == 'h5' ? <p>h5网页</p> : text == 'allocation' ? <p>配资页</p> : <p>{text}</p>
                    }</div>
            },
            {
                title: "跳转到",
                dataIndex: "jumpurl",
                render: (text, record) =>
                    <div>{
                        text ? text : record.allocateType == 'NEW' ? <p>新手体验</p> : record.allocateType == 'DAY' ? <p>天天向上</p> : record.allocateType == 'MONTH' ? <p>月月成长</p> : <p>{record.allocateType}</p>
                    }</div>
            },
            {
                title: "跳转标题",
                dataIndex: "jumptitle"
            },
            {
                title: "图片路径",
                dataIndex: "imageUrl",
                render: (text) =>
                    <div>
                        <a onClick={() => { this.showPic(text) }}>点击查看</a>
                    </div>
            },
            {
                title: "排序",
                dataIndex: "sort"
            },

            {
                title: "标题",
                dataIndex: "title"
            },
            {
                title: "是否使用",
                dataIndex: "use",
                render: (text) =>
                    <div>
                        {text ? '是' : '否'}
                    </div>
            },
            {
                title: "是否分享",
                dataIndex: "share",
                render: (text) =>
                    <div>
                        {text ? '是' : '否'}
                    </div>
            },
            {
                title: "标签",
                dataIndex: "tag"
            },
            {
                title: "操作",
                key: "action",
                render: (record) => <div>
                    <a href="javascript:;" onClick={() => this.change(record)}>修改</a>
                    丨
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.remove(record)}>
                        <a href="javascript:;" >删除</a>
                    </Popconfirm>

                </div>

            },
        ],
        itemList: [],
        loading: false,
        picVisible: false,
        picImage: null,
        useType: true,
        shareType: true,
        jumpType: 'h5',
        loadingSubmit: false,
        loadingCancel: false,
        fileList: [],
        uploadImgs: [],
        itemImgUrl: null,
        itemImgId: '',
        allocateType: ''

    }

    render() {
        return (
            <div>
                <PageHeader
                    title="轮播图管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                />
                <div id="bodyDivSlide" className="tableBox" >
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="基本信息" key="1">
                            <Table columns={this.state.columns} dataSource={this.state.itemList} rowKey={record => record.id}
                                loading={this.state.loading}
                                bordered
                            />
                        </TabPane>
                        <TabPane tab={this.state.tab2Name} key="2" className="inputDiv">
                            <p><label>目标标题：</label><Input ref='title' size="large" type="text" placeholder="" /></p>
                            <p><label>排序位置：</label><Input ref='sort' size="large" type="text" placeholder="请输入数字：1,2,3..." /></p>

                            <img style={{ width: '100px', marginLeft: '257px', marginBottom: '20px', display: this.state.uploadImgs.length < 1 ? 'block' : "none" }} src={this.state.itemImgUrl} />
                            <Upload className="modalUpload"
                                action={picUrl.url}
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onChange={this.handleChange}
                                onRemove={this.handleRemove}
                            // onPreview={this.handlePreview}
                            >
                                {this.state.uploadImgs.length < 1 ? uploadButton : ''}
                            </Upload>

                            <div>
                                <RadioGroup onChange={this.useTypeOnChange} value={this.state.useType ? 'true' : 'false'} className="radioGroup">
                                    <RadioButton value="true">是</RadioButton>
                                    <RadioButton value="false">否</RadioButton>
                                </RadioGroup>
                            </div>
                            <div>
                                <RadioGroup onChange={this.jumpTypeOnChange} value={this.state.jumpType} className="radioGroup1">
                                    <RadioButton value="h5">h5网页</RadioButton>
                                    <RadioButton value="allocation">配资页</RadioButton>
                                </RadioGroup>
                            </div>



                            <p ><label>{this.state.jumpType == "h5" ? '跳转标题：' : '设置标签：'}</label><Input ref='jumpTitle' size="large" type="text" placeholder="" /></p>
                            <p style={{ display: this.state.jumpType == "h5" ? 'block' : 'none' }}><label>跳转路径：</label><Input ref='jumpUrl' size="large" type="text" placeholder="" /></p>
                            <div style={{ display: this.state.jumpType == "h5" ? 'block' : 'none' }}>
                                <RadioGroup onChange={this.shareTypeOnChange} value={this.state.shareType ? 'true' : 'false'} className="radioGroup2">
                                    <RadioButton value="true">是</RadioButton>
                                    <RadioButton value="false">否</RadioButton>
                                </RadioGroup>
                            </div>
                            <div style={{ display: this.state.jumpType == "h5" ? 'none' : 'block' }}>
                                <RadioGroup onChange={this.allocateTypeChange} value={this.state.allocateType} className="radioGroup3">
                                    <RadioButton value="DAY">天天向上</RadioButton>
                                    <RadioButton value="MONTH">月月成长</RadioButton>
                                    <RadioButton value="NEW">新手体验</RadioButton>
                                </RadioGroup>
                            </div>


                            <p>
                                <Button key="submit" type="primary" size="large" loading={this.state.loadingSubmit} onClick={this.handleOk}>确定</Button>
                                <Button key="back" size="large" onClick={this.handleCancel} loading={this.state.loadingCancel}>取消</Button>
                            </p>

                        </TabPane>
                    </Tabs>
                </div >
                <Modal visible={this.state.picVisible} footer={null} onCancel={this.handleCancelPic} style={{ zIndex: 999 }}>
                    <img style={{ width: '100%' }} src={this.state.picImage} />
                </Modal>
            </div>
        )

    }
    //下面函数时为了切换TABS
    tabsOnChange = (key) => {
        if (this.state.activeKey == "1") {
            this.setState({
                activeKey: "2"
            });
        } else {
            this.setState({
                activeKey: "1"
            });
        }
        // console.log(key)
    }

    refresh = () => {
        this.setState({ loading: true });
        getSlideList((action) => {
            this.props.dispatch(action)
            console.log(this.props.slideList)
            this.setState({
                loading: false,
                itemList: this.props.slideList.data.result
            })
            console.log(this.state.itemList)
        })
    }
    componentDidMount() {
        this.refresh()
    }
    //查看图片路线
    showPic = (text) => {
        this.setState({
            picVisible: true,
            picImage: text
        })
    }
    //取消图片的弹窗
    handleCancelPic = () => {
        this.setState({
            picVisible: false
        })
    }

    change = (record) => {
        // console.log(record)
        setTimeout(() => {

            this.setState({
                itemImgId: record.id,
                uploadImgs: [],
                fileList: [],
                activeKey: "2",
                tab2Name: '修改链接',
                itemImgUrl: record.imageUrl,
                jumpType: record.jumpType,
                useType: record.use,
                shareType: record.share,
                allocateType: record.allocateType
            })
            this.refs.title.input.value = record.title
            this.refs.sort.input.value = record.sort
            this.refs.jumpUrl.input.value = record.jumpurl ? record.jumpurl : record.allocateType
            this.refs.jumpTitle.input.value = record.jumptitle ? record.jumptitle : record.tag
        }, 500);

    }
    remove = (record) => {
        removeSlideList(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })
    }
    //跳转的方式的切换
    jumpTypeOnChange = (e) => {

        this.setState({
            jumpType: e.target.value
        })
    }
    //是否使用的方式的切换
    useTypeOnChange = (e) => {
        this.setState({
            useType: e.target.value == 'true' ? true : false
        })
    }
    //是否分享
    shareTypeOnChange = (e) => {
        this.setState({
            shareType: e.target.value == 'true' ? true : false
        })
    }
    allocateTypeChange = (e) => {
        this.setState({
            allocateType: e.target.value
        })
    }
    //点击取消
    handleCancel = () => {
        this.refs.title.input.value = ''
        this.refs.sort.input.value = ''
        this.refs.jumpUrl.input.value = ''
        this.refs.jumpTitle.input.value = ''
        this.setState({
            fileList: [],
            uploadImgs: [],
            itemImgUrl: null,
            activeKey: '1',
            tab2Name: '新增配置'
        })
        this.refresh()
    }
    handleOk = () => {
        let item
        if (this.state.tab2Name == '新增配置') {
            if (this.state.jumpType == 'h5') {
                item = {
                    title: this.refs.title.input.value,
                    sort: this.refs.sort.input.value,
                    imageUrl: this.state.uploadImgs[0],
                    isUse: this.state.useType,
                    jumpType: this.state.jumpType,

                    jumpurl: this.refs.jumpUrl.input.value,
                    jumpTitle: this.refs.jumpTitle.input.value,
                    share: this.state.shareType,
                }
            } else if (this.state.jumpType == 'allocation') {
                item = {
                    title: this.refs.title.input.value,
                    sort: this.refs.sort.input.value,
                    imageUrl: this.state.uploadImgs[0],
                    isUse: this.state.useType,
                    jumpType: this.state.jumpType,

                    allocateType: this.state.allocateType,
                    tag: this.refs.jumpTitle.input.value,
                }
            }

            addSlideList(item, (action) => {
                this.props.dispatch(action)
                if (this.props.slideList.code == 0) {
                    this.handleCancel()
                    this.refresh()
                } else {
                    this.openNotificationWithIcon("error", this.props.slideList.message)
                }
            })


        } else if (this.state.tab2Name == '修改链接') {
            if (this.state.jumpType == 'h5') {
                item = {
                    id: this.state.itemImgId,
                    title: this.refs.title.input.value,
                    sort: this.refs.sort.input.value,
                    imageUrl: this.state.uploadImgs.length == 1 ? this.state.uploadImgs[0] : this.state.itemImgUrl,
                    isUse: this.state.useType,
                    jumpType: this.state.jumpType,

                    jumpurl: this.refs.jumpUrl.input.value,
                    jumpTitle: this.refs.jumpTitle.input.value,
                    share: this.state.shareType,
                }
            } else if (this.state.jumpType == 'allocation') {
                item = {
                    id: this.state.itemImgId,
                    title: this.refs.title.input.value,
                    sort: this.refs.sort.input.value,
                    imageUrl: this.state.uploadImgs.length == 1 ? this.state.uploadImgs[0] : this.state.itemImgUrl,
                    isUse: this.state.useType,
                    jumpType: this.state.jumpType,

                    allocateType: this.state.allocateType,
                    tag: this.refs.jumpTitle.input.value,
                }
            }
            // console.log(item)
            changeSlideList(item, (action) => {
                this.props.dispatch(action)
                if (this.props.slideList.code == 0) {
                    this.handleCancel()
                    this.refresh()
                } else {
                    this.openNotificationWithIcon("error", this.props.slideList.message)
                }
            })
        }
    }

    //上传图片
    handleChange = (info) => {

        if (info.file.status === 'done') {
            this.state.uploadImgs.push(info.file.response.data.path)
        } else if (info.file.status === 'error') {
            this.openNotificationWithIcon("error", "上传图片失败")
        }
        this.setState({ fileList: info.fileList })
    }
    //点击移除图片按钮
    handleRemove = (info) => {
        for (let i = 0; i < this.state.uploadImgs.length; i++) {
            if (this.state.uploadImgs[i] == info.response.data.path) {
                this.state.uploadImgs.splice(i, 1)
                break;
            }
        }
        this.setState({
            uploadImgs: this.state.uploadImgs
        })
        // console.log(this.state.uploadImgs)
    }
    //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };

}

function filterlist(store) {
    // console.log(store);
    return {
        slideList: store.slideList
    }
}

export default connect(filterlist)(Slide)

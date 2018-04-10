import React from "react";
import { Tabs, Modal, Input, Table, columns, Button, Radio, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getVersioningAppList, addVersioningApp, changeVersioningApp, removeVersioningApp } from "../../redux/actions/acUsers/acVersioningApp";

require("./VersioningApp.less")

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class VersioningApp extends React.Component {
    
    state = {
        breadcrumbList: [
            {
            title: '首页',
            href: '#/main/index',
            }, {
            title: '系统设置',
            }, {
            title: 'APP版本管理',
        }],
        columns: [
            {
                title: "名称",
                dataIndex: "appName"
            }, 
            {
                title: "类型",
                dataIndex: 'appType',
            },
            {
                title: "强制更新",
                dataIndex: "forced",
                render: (record) =>
                    <div>{
                        record  ? <div>是</div> : <div>否</div>
                    }</div>
            },
            {
                title: "版本名称",
                dataIndex: "versionName"
            },
            {
                title: "版本号",
                dataIndex: "versionNo"
            },
            {
                title: "创建时间",
                dataIndex: "gmtCreate"
            },
            {
                title: "更新时间",
                dataIndex: "gmtModified"
            },
            {
                title: "更多信息",
                dataIndex: "",
                render: (record) =>
                    <div>
                        <a onClick={() => this.changeBool(record)}>点击展开</a>
                    </div>
            },
            {
                title: "操作",
                key: "action",
                render: (record) => <div>
                    <a href="javascript:;" onClick={() => this.changeVer(record)}>修改</a>
                    丨
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeVer(record)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    
                </div>
            },],
        data:[],
        tab2Name:"新增版本",
        activeKey:'1',
        loading:false,
        modalvisible:false,
        loadingSubmit:false,
        loadingCancel:false,
        versionType:'iOS',
        versionForced:false,
        versionId:256,
        expandRowByClick:true,
        input1:false,
        input2:false,
        input3:false,
        input4:false,
        expandedRowKeys:[],
    };

    refresh = () => {
        this.setState({ loading: true });
        
        getVersioningAppList((action)=>{
            this.props.dispatch(action)
            console.log(this.props.versioningList)
            this.setState({ loading: false, data: this.props.versioningList.data.result });
        })
    };
    componentDidMount() {
        console.log(111)
        this.refresh()
    }
    changeBool = (record)=>{
        // console.log(record)
        if (this.state.expandedRowKeys[0] == record.id){
            this.setState({
                expandedRowKeys: []
            })
        }else{
            this.setState({
                expandedRowKeys: [record.id]
            })
        }
    }


    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="APP版本管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                />
                <div id="bodyDivVer" className="tableBox">
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="版本信息" key="1">

                            <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered
                                expandedRowKeys={this.state.expandedRowKeys}
                                // expandRowByClick={this.state.expandRowByClick}
                                expandedRowRender={record => 
                                    <div>
                                        <p style={{ margin: 0 }}>安装包路径：{record.fileUrl}</p>
                                        <p style={{ margin: 0 }}>更新内容：{record.versionNote}</p>
                                    </div>
                                }
                            />
                        </TabPane>
                        <TabPane tab={this.state.tab2Name} key="2" className="inputDiv">
                            {/* <p><label>信息名称：</label><Input ref='appName' size="large" type="text" placeholder="例子：xinghuo" /><Icon type="close" style={this.state.input1?{'color':'red'}:{'display':'none'}}></Icon></p> */}
                            <p><label>信息版本：</label><Input ref='versionName' size="large" type="text" placeholder="例子：v1.0" /><Icon type="close" style={this.state.input2 ? { 'color': 'red' } : { 'display': 'none' }}></Icon></p>
                            <p><label>版本编号：</label><Input ref='versionNo' size="large" type="text" placeholder="例子：1" /><Icon type="close" style={this.state.input3 ? { 'color': 'red' } : { 'display': 'none' }}></Icon></p>
                            <p><label>安装路径：</label><Input ref='fileUrl' size="large" type="text" placeholder="" /></p>
                            <div>   
                                <RadioGroup onChange={this.typeOnChange} value={this.state.versionType} className="radioGroup233">
                                    <RadioButton value="iOS">iOS</RadioButton>
                                    <RadioButton value="Android">Android</RadioButton>
                                </RadioGroup>
                            </div>
                            <div> 
                                <RadioGroup onChange={this.forcedOnChange} value={this.state.versionForced?'true':'false'} className="radioGroup77">
                                    <RadioButton value="true">是</RadioButton>
                                    <RadioButton value="false">否</RadioButton>
                                </RadioGroup>
                            </div>
                            <div className="textAreaDiv">
                                <TextArea maxLength="300" ref='textArea' placeholder="请输入版本更新内容（10-300）" autosize={{ minRows: 6, maxRows: 6 }} className="textArea" /><Icon type="close" style={this.state.input4 ? { 'color': 'red' } : { 'display': 'none' }}></Icon>
                            </div>
                            <p>
                                <Button key="submit" type="primary" size="large" loading={this.state.loadingSubmit} onClick={this.handleOk}>确定</Button>
                                <Button key="back" size="large" onClick={this.handleCancel} loading={this.state.loadingCancel}>取消</Button>
                            </p>
                        </TabPane>
                    </Tabs>
                    <Modal
                        title="警告"
                        visible={this.state.modalvisible}
                        onOk={this.modalOk}
                        onCancel={this.modalOk}
                    >
                        <p>{this.state.msg}</p>

                    </Modal>

                </div >
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

    typeOnChange = (e)=> {
       
        this.setState({
            versionType: e.target.value
        })
    }

    forcedOnChange = (e)=> {
        console.log(e.target.value)
        this.setState({
            versionForced: e.target.value == 'true'? true:false
        })
    }
  
    //点击修改按钮后
    changeVer = (record) =>{
        console.log(record)
        this.setState({
            activeKey: "2",
            tab2Name:"修改信息",
            versionForced: record.forced,
            versionType: record.appType,
            versionId: record.id,
            // input1: false,
            input2: false,
            input3: false,
            input4: false,
            
        },()=>{
            // this.refs.appName.input.value = record.appName
            this.refs.versionName.input.value = record.versionName
            this.refs.versionNo.input.value = record.versionNo
            this.refs.fileUrl.input.value = record.fileUrl
            this.refs.textArea.textAreaRef.value = record.versionNote
            console.log(this.state.versionType, this.state.versionForced)
        })
    }
    removeVer = (record) => {
        removeVersioningApp(record.id,(action)=>{
            this.props.dispatch(action)
            this.refresh()
        })
    }
    handleOk = () => {
        let num = 0 ;
        let item = {
            // appName: this.refs.appName.input.value,
            versionName: this.refs.versionName.input.value,
            versionNo: this.refs.versionNo.input.value,
            fileUrl: this.refs.fileUrl.input.value,
            versionNote: this.refs.textArea.textAreaRef.value,
            forced:this.state.versionForced,
            type:this.state.versionType
        }
        // if (this.refs.appName.input.value.length == 0){
        //     this.setState({
        //         input1:true
        //     })
        // }else{
        //     num ++
        //     this.setState({
        //         input1: false
        //     })
        // }
        if (this.refs.versionName.input.value.length == 0) {
            this.setState({
                input2: true
            })
        } else {
            num++
            this.setState({
                input2: false
            })
        }
        if (this.refs.versionNo.input.value.length == 0) {
            this.setState({
                input3: true
            })
        } else {
            num++
            this.setState({
                input3: false
            })
        }
        if (this.refs.textArea.textAreaRef.value.length == 0) {
            this.setState({
                input4: true
            })
        } else {
            num++
            this.setState({
                input4: false
            })
        }
        console.log(num)
        if(num == 3){
            console.log('yes')
            if (this.state.tab2Name == "新增版本"){
            addVersioningApp(item,(action)=>{
                this.props.dispatch(action)
                this.handleCancel()
                this.refresh()
            })
            } else if (this.state.tab2Name == "修改信息"){
                item.id = this.state.versionId
                changeVersioningApp(item,(action)=>{
                    this.props.dispatch(action)
                    this.handleCancel()
                    this.refresh()
                })
            }
        }else{
            console.log('no')
        }
     
        
    }

    handleCancel = () => {
        // this.refs.appName.input.value = ''
        this.refs.versionName.input.value = ''
        this.refs.versionNo.input.value = ''
        this.refs.fileUrl.input.value = ''
        this.refs.textArea.textAreaRef.value = ''
        this.setState({
            activeKey: "1",
            tab2Name : "新增版本",
            // input1: false,
            input2: false,
            input3: false,
            input4: false,
        })
    }
    modalOk = () => {

    }

}
function filterList(store) {
    // console.log(store)
    return {
        versioningList: store.versioningAppManage
    }
}

export default connect(filterList)(VersioningApp)
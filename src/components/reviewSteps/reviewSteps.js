import React from "react";
import { Tabs, Modal, Input, Table, columns, Button, Radio, Icon, Checkbox, Popconfirm} from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getReviewStepList, getroleList, addReviewStepList, changeReviewStepList, removeReviewStepList } from "../../redux/actions/acReviewSteps/acReviewSteps";

require("./reviewSteps.less")


const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const redT = (text)=>{
    let num =''
    for(let value of text){
        num += `        ${value}            `
    
    }
    return num
}

class ReviewSteps extends React.Component {

    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '审核管理',
            }, {
                title: '审核信息',
            }],
        columns: [
            {
                title: "标题",
                dataIndex: "title"
            },
            {
                title: "步骤",
                dataIndex: 'step',
            },
            {
                title: "角色",
                dataIndex: "roles",
                render:(text) =>
                    redT(text)
            },
            {
                title: "备注",
                dataIndex: "remark"
            },
            {
                title: "操作",
                key: "action",
                render: (record) => <div>
                    <a href="javascript:;" onClick={() => this.changeRev(record)}>修改</a>
                    丨
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeRev(record)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                   
                </div>
            },],
        data: [],
        //点击的list
        checked:[],

        //整体信息的list
        checkedList:[],
        //点击的信息的list（用于点击展示）
        checkedroList:[],
        //设置单条信息ID用于修改
        newCheckd:[],
        personId:256,
        tab2Name: "新增信息",
        activeKey: '1',
        loading: false,
        modalvisible: false,
        input1: false,
        input2: false,
        input3: false,
        expandedRowKeys: [],
        msg:'',
        //用于渲染角色
        roles:[]
    };


    refresh = () => {
        this.setState({ loading: true });

        getReviewStepList((action) => {
            this.props.dispatch(action)
            // console.log(this.props.reviewStepList)
            this.setState({ loading: false, data: this.props.reviewStepList.data.result, roles: this.props.reviewStepList.data.result.roles});
        })
    };
    componentDidMount() {
        getroleList((action)=>{
            this.props.dispatch(action)
            let arr = []
            let list = this.props.reviewStepList.data.result
            for (let value of list) {
                arr.push(value.roleName)
            }
            this.setState({
                checkedList: list,
                checkedroList: arr
            })
           
        
        })
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="审核信息"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                />
                <div id="bodyDivRev" className="tableBox">
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="版本信息" key="1">

                            <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered
                                expandedRowKeys={this.state.expandedRowKeys}
                                // expandRowByClick={this.state.expandRowByClick}
                               
                            />
                        </TabPane>
                        <TabPane tab={this.state.tab2Name} key="2" className="inputDiv">
                            <p><label>标题文字：</label><Input ref='title' size="large" type="text" /></p>
                            <p><label>步骤信息：</label><Input ref='step' size="large" type="text" disabled={this.state.tab2Name == '新增信息' ? false : true}/></p>
                            <p><label>备注内容：</label><Input ref='remark' size="large" type="text" /></p>
                            <CheckboxGroup className='radioGroup' options={this.state.checkedroList} value={this.state.newCheckd} onChange={this.checkedOnChange}></CheckboxGroup>
                            <p>
                                <Button key="submit" type="primary" size="large" onClick={this.handleOk} >确定</Button>
                                <Button key="back" size="large" onClick={this.handleCa}  >取消</Button>
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

    //警告
    modalOk = ()=>{
        this.setState({
            modalvisible:false
        })
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

    typeOnChange = (e) => {

        this.setState({
            versionType: e.target.value
        })
    }

    //点击多选框后
    checkedOnChange = (checked) => {
        this.setState({
            checked: checked,
            newCheckd: checked
        })
        // if (this.state.tab2Name == '新增用户') {
        //     this.setState({
        //         roIds: checked,
        //         newCheckd: checked
        //     })
        // } else {
        //     this.setState({
        //         roIds: checked,
        //         changeChecked: checked
        //     })
        // }

        // console.log(checked);
    }   
    //点击取消
    handleCa = ()=>{
        this.refs.title.input.value = ''
        this.refs.step.input.value = ''
        this.refs.remark.input.value = ''
        this.setState({
            checked:[],
            newCheckd:[],
            activeKey:'1',
            tab2Name:'新增信息'
        }) 
    }
    //点击确定
    handleOk = ()=>{

        let arr = this.state.newCheckd
        let roles = []
        for (let value of this.state.checkedList) {
            for (let i = 0; i < arr.length; i++) {
                if (value.roleName == arr[i]) {
                    roles.push(value.id)
                }
            }
        }

        let item ={
            title: this.refs.title.input.value,
            step: this.refs.step.input.value,
            remark: this.refs.remark.input.value,
            roles,
        }
        console.log("item",item)
        if (item.title.length > 0 && item.step.length > 0 && item.remark.length > 0 && item.roles.length > 0){
            if (this.state.tab2Name =='新增信息'){
                    addReviewStepList(item,(action)=>{
                        this.props.dispatch(action)
                        if(this.props.reviewStepList.code == 0){
                            this.handleCa()
                            this.refresh()
                        } else if (this.props.reviewStepList.code > 0){
                            this.setState({
                                modalvisible:true,
                                msg: this.props.reviewStepList.message
                            })
                        }
                    })
                } else if (this.state.tab2Name == '修改信息'){
                    item.id = this.state.personId
                    changeReviewStepList(item,(action)=>{
                        this.props.dispatch(action)
                        if (this.props.reviewStepList.code == 0) {
                            this.handleCa()
                            this.refresh()
                        } else if (this.props.reviewStepList.code > 0) {
                            this.setState({
                                modalvisible: true,
                                msg: this.props.reviewStepList.message
                            })
                        }
                    })
                }
        }else{
            this.setState({
                modalvisible:true,
                msg:'每一项都是必填项'
            })
        }
       
    
    }
    //点击修改
    changeRev = (record)=>{
        // console.log(record)
        setTimeout(() => {
            this.setState({
                activeKey: "2",
                tab2Name: "修改信息",
                loading: false,
                personId: record.id,
                newCheckd:record.roles
            });
            this.refs.title.input.value = record.title
            this.refs.step.input.value = record.step
            this.refs.remark.input.value = record.remark
 
        }, 500);
    }
    //点击删除
    removeRev = (record)=>{
        removeReviewStepList(record.id,(action)=>{
            this.props.dispatch(action)
            this.refresh()
        })
    }
}
function filterList(store) {
    // console.log(store)
    return {
        reviewStepList: store.reviewStepManage
    }
}

export default connect(filterList)(ReviewSteps)
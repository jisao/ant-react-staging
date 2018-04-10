import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm ,Tree,notification, } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getroleList, removeRole, changeRole, addRole, getRoleResource, changeRoleResource} from "../../redux/actions/acUsers/acRole"; 
import { getResourceList } from "../../redux/actions/acUsers/acResource"; 
import { element } from "prop-types";

require("./role.less")

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class role extends React.Component{
   
        state={
            activeKey:'1',
            pagination: {
                current: 1,
                pageSize: 5,
                total: 0
            },
            breadcrumbList: [
                {
                    title: '首页',
                    href: '#/main/index',
                }, 
                {
                    title: '系统设置',
                }, 
                {
                    title: '角色管理',
                }
            ],
            columns: [
                {
                    title: '角色名称',
                    dataIndex: 'roleName',
                    width: '25%',
                },
                {
                    title: '角色代码',
                    dataIndex: 'roleCode',
                    width: '25%',
                }, 
                {
                    title:"查看",
                    dataIndex:'',
                    render: (record) => {
                        return (
                            <div>
                                <a onClick={() => this.checkResource(record.id) }>查看角色资源</a>
                            </div>
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (record) =>
                        <div>
                            <a href="javascript:;" onClick={() => this.changeIt(record)}>修改</a>
                            丨
                            <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeIt(record)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                        </div>
                }
            ],
            loading:false,
            data:[],
            modalTitle:'',
            modalvisible:false,
            ErMsg:'',
            changeID:'',
            //==========
            roleId:'',
            checkedKeys:[],
            // showCheckedKeys:[],
            expandedKeys: [],
            selectedKeys: [],
            autoExpandParent: true,
            treeData:[],
            selectedKeys:[],
            checkOk:false,
            ids:[]
        }
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
        render(){
            return (
                <div>
                    <PageHeader
                        title="角色管理"
                        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                        breadcrumbList={this.state.breadcrumbList}
                        content=''
                        action={
                            this.state.activeKey == '1'?
                            <Button type="primary"  className="editable-add-btn" onClick={this.addIt}>添加角色</Button>
                            :
                            <Button   className="editable-add-btn" onClick={this.goBack}>返回上层</Button>
                        }
                        extraContent={<div className="extraContent">
                            {this.state.activeKey == '1'?'':<div>{
                                !this.state.checkOk?<Button type="primary" onClick={this.changeRoleRe}><Icon type="idcard" />修改资源</Button> 
                                    :
                                    <div>
                                        <Button type="primary" style={{marginRight:20}} onClick={this.goChangeRoleResource}>确认修改</Button><Button type="primary" onClick={this.goBack}>取消修改</Button>
                                    </div>
                            }</div>}
                        </div>}
                    />
                    <div className="tableBox tableBox1">
                        <Tabs defaultActiveKey="1" 
                        type="card" 
                        activeKey={this.state.activeKey} 
                        onChange={this.tabsOnChange}>
                            <TabPane tab="xxx" key="1">
                                <Table bordered 
                                dataSource={this.state.data} 
                                columns={this.state.columns} loading={this.state.loading}
                                rowKey={record => record.id}/>
                            </TabPane>
                            <TabPane tab="xxx" key="2">
                            <Tree
                                checkable
                                onExpand={this.onExpand}
                                expandedKeys={this.state.expandedKeys}
                                autoExpandParent={this.state.autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                showLine={true}
                                onSelect={this.onSelect}
                                selectedKeys={this.state.selectedKeys}
                            >
                                {this.renderTreeNodes(this.state.treeData)}
                            </Tree>
                            </TabPane>
                        
                        </Tabs>
                        <Modal
                                title={this.state.modalTitle}
                                visible={this.state.modalvisible}
                                onOk={this.modalOk}
                                onCancel={this.modalCa}
                            >
                                <p style={{marginLeft:20}}><label>角色名称：</label><Input ref='roleName' style={{width:"66%"}} type='text'/></p>
                                <p style={{marginLeft:20}}><label>角色代码：</label><Input ref='roleCode' style={{ width: "66%" }} type='text'/></p>
                                <p style={{marginLeft:90,color:'red'}}>{this.state.ErMsg}</p>
                            </Modal>
                    </div>
                </div>
                )
        }
        refresh = ()=>{
            this.setState({ loading: true });
            getroleList((action) => {
                this.props.dispatch(action);
                console.log(this.props.roleList)
                if(this.props.roleList.code == 0){
                    this.setState({ loading: false, data: this.props.roleList.data.result });
                }else{
                    notification.open({
                        message: '警告',
                        description:this.props.roleList.message ,
                    });
                }
            })
        }
        componentDidMount = ()=>{
            this.refresh()
        }
        addIt = ()=>{
            this.setState({
                modalvisible:true,
                modalTitle:'新增角色'
            })
        }
        changeIt = (record)=>{
            console.log(record.id)
            setTimeout(() => {
                this.setState({
                    changeID:record.id,
                    modalvisible:true,
                    modalTitle:'修改角色'
                })
                this.refs.roleName.input.value = record.roleName
                this.refs.roleCode.input.value = record.roleCode
            }, 500);
        }
        removeIt = (record)=>{
            console.log(record.id)
            removeRole(record.id,(action)=>{
                this.props.dispatch(action)
                console.log(this.props.roleList)
                if(this.props.roleList.code == 0){
                    this.refresh()
                }else{
                    notification.open({
                        message: '警告',
                        description:this.props.roleList.message ,
                    });
                }
            })
        }
        modalOk = ()=>{
            if(this.refs.roleName.input.value.length == 0 || this.refs.roleCode.input.value.length == 0){
                this.setState({
                    ErMsg:'每一项为必填项！'
                })
                return
            }
            let item = {
                roleName:this.refs.roleName.input.value,
                roleCode:this.refs.roleCode.input.value
            }
            if(this.state.modalTitle == '新增角色'){
                addRole(item,(action)=>{
                    this.props.dispatch(action)
                    console.log(this.props.roleList)
                    if(this.props.roleList.code == 0){
                        this.modalCa()
                    }else{
                        this.setState({
                            ErMsg:this.props.roleList.message
                        })
                    }
                })
            }else if(this.state.modalTitle == '修改角色'){
                item.id = this.state.changeID
                changeRole(item,(action)=>{
                    this.props.dispatch(action)
                    console.log(this.props.roleList)
                    if(this.props.roleList.code == 0){
                        this.modalCa()
                    }else{
                        this.setState({
                            ErMsg:this.props.roleList.message
                        })
                    }
                })
            }
        }
        modalCa = ()=>{
            this.refs.roleName.input.value = ''
            this.refs.roleCode.input.value = ''
            this.setState({
                modalvisible:false,
                ErMsg:''
            })
            this.refresh()
        }
        checkResource = (id)=>{
            console.log(id)
            this.setState({
                activeKey : '2',
                roleId:id
            })
            getResourceList((action)=>{
                this.props.dispatch(action)
                console.log('全表',this.props.roleList)
                if(this.props.roleList.code == 0){
                    this.setState({
                        treeData: this.props.roleList.data.result
                    })
                    getRoleResource(id,(action)=>{
                        this.props.dispatch(action)
                        //获取到角色拥有的资源
                        console.log('roleList',this.props.roleList)
                        if(this.props.roleList.code == 0){
                            let arr = this.props.roleList.data.result
                            let arr1 = []
                            for(let value of arr){
                                arr1.push(JSON.stringify(value))
                            }
                            console.log(arr1)
                            this.setState({
                                ids:arr,
                                checkedKeys: arr1,
                                expandedKeys: arr1,
                            })
                    
                     
                        }else{
                            notification.open({
                                message: '警告',
                                description:this.props.roleList.message ,
                            });
                        }
                    })
                }else{
                    notification.open({
                        message: '警告',
                        description:this.props.roleList.message ,
                    });
                }
            })
           
        }
        renderTreeNodes = (data) => {
            return data.map((item) => {
                if (item.children) {
                    return (
                        <TreeNode title={<div style={{ fontWeight: "900", fontSize: "14px" }}><Icon type="bars" />{item.title}</div>} key={item.id} dataRef={item} >
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode {...item} title={<div><Icon type="file-text" />{item.title}</div>}  key={item.id}  />;
            })
    
        }
        onExpand = (expandedKeys) => {
            console.log('onExpand', arguments);
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.setState({
              expandedKeys,
              autoExpandParent: false,
            });
        }
        onCheck = (checkedKeys,info) => {
            if(this.state.checkOk){
                console.log('onCheck', checkedKeys);
                console.log(info.halfCheckedKeys)
                this.setState({ checkedKeys, },()=>{
                    let arr1 = checkedKeys
                    let arr = [...arr1,...info.halfCheckedKeys]
                    this.setState({
                        ids:arr,
                        expandedKeys:arr
                    })
                });
            }else{
                return
            }
            
           
        }
        onSelect = (selectedKeys, info) => {
            // console.log('onSelect', info);
            this.setState({ selectedKeys });
        }
        goBack = ()=>{
            this.setState({
                activeKey:'1',
                checkOk:false
            })
            this.refresh()
        }
        changeRoleRe =()=>{
            this.setState({
                checkOk:true,
            })
        }
        goChangeRoleResource = ()=>{
            console.log(this.state.ids)
            let arr = this.state.ids
            let arr1 = []
            for(let value of arr){
                arr1.push(JSON.parse(value))
            }
            console.log("arr11111",arr1)
            // if(arr1.length == 0){
            //     console.log('没修改')
            //     this.goBack()
            // }else{
                changeRoleResource(this.state.roleId,arr1,(action)=>{
                    this.props.dispatch(action)
                    console.log(this.props.roleList)
                    if(this.props.roleList.code == 0){
                        this.goBack()
                        notification.open({
                            message: '通知',
                            description:'角色资源修改成功！',
                        });
                    }else{
                        notification.open({
                            message: '警告',
                            description:this.props.roleList.message ,
                        });
                    }
                })
            // }
        }
}      
       


function filterUsersList(store) {
    return {
        roleList: store.roleManage
    }
}

export default connect(filterUsersList)(role)

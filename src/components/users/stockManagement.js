import React from "react";
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getStockList, addStack, removeStack, searchStockList,  } from "../../redux/actions/acUsers/acStockManagement";

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

class StockManagement extends React.Component {
    state = {
        ErMsg:'',
        //inputdata是修改时候的输入框内容
        inputData: {},
        //下面是切换Tab时候的显示内容
        tab2Name: '新增股票',
        activeKey: "1",
        //下面是搜索栏的内容
        expand: true,
        labels: ['代码', '名称'],
        ok: ["a", "b"],
        //多选框的默认选中
        //数组包对象的角色list
        checkedList: [],
        //纯数组的只有显示名字的list
        checkedroList: [],
        //默认下的多选框勾选情况
        changeChecked: [],
        //只有名字的多选框
        roIds: [],
        //在新增用户页面下的多选框勾选情况
        newCheckd: [],

        data: [],
        //修改时候的个人ID
        personId: '',
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        modalvisible: false,
        msg: '',
        loading: false,
        loadingReset: false,
        loadingSubmit: false,
        loadingCancel: false,
        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
            title: '系统设置',
        }, {
            title: '股票管理',
        }],
        tabList: [{
            key: '页签一',
            tab: '股票信息',
        }, {
            key: '页签二',
            tab: '新增股票',
        }],
        columns: [
        {
            title: "股票代码",
            dataIndex: "code"
        }, 
        {
                title: "股票名称",
                dataIndex: "name"
        },
        {
                title: "市场",
                dataIndex: "market",
            render: (text)=>
                <div>{text == 'SHA' ? <div>上海</div> : text == 'SZA' ? <div>深圳</div>:<div>{text}</div>}</div>
        }, 
        {
             title: "拼音缩写",
             dataIndex: "py"
        }, 
        {
            title: "操作",
            key: "action",
            render: (record) => <div>
                <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeStackId(record)}>
                    <a href="#">删除</a>
                </Popconfirm>
            </div>
        },]
    };

    //换页
    handleTableChange = (pagination) => {
        // console.log(pagination)
        this.setState({ loading: true });
        setTimeout(() => {
            getStockList(pagination.current, pagination.pageSize, (action) => {
                this.props.dispatch(action);
                console.log(this.props.usersList)
                this.setState({
                    data: this.props.usersList.data.result,
                    pagination: {
                        current:this.props.usersList.data.pageNo,
                        total: this.props.usersList.data.total,
                        pageSize: this.props.usersList.data.pageSize,

                    }
                });
            })
            this.setState({ loading: false });
        }, 200);

    };

    refresh = () => {
        this.setState({ loading: true });
        getStockList(this.state.pagination.current, this.state.pagination.pageSize, (action) => {
            this.props.dispatch(action);
            console.log(this.props.usersList)
            this.setState({
                loading: false,
                data: this.props.usersList.data.result,
                pagination: {
                    current:this.props.usersList.data.pageNo,
                    total: this.props.usersList.data.total,
                    pageSize: this.props.usersList.data.pageSize,

                }
            });
        })
    };
    componentDidMount() {
        this.refresh()

    }


    //重置搜索框
    handleReset = () => {
        this.setState({
            loadingReset: true
        })
        this.refresh()
        this.refs.a.input.value = ''
        this.refs.b.input.value = ''
        setTimeout(() => {
            this.setState({ loadingReset: false });
        }, 300);
    }



    render() {
        const { visible, loading, loadingSubmit, loadingReset, loadingCancel, columns, visible1, inputData, } = this.state;

        const { usersList } = this.props

        return (
            <div>
                <PageHeader className="UsersPageHeader pageDiv" 
                    title="股票管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content={
                        <div>
                                <Input type='text' style={{width:"20%",marginRight:10,marginBottom:17}} ref='a' placeholder='请输入代码' />
                                <Input type='text' style={{width:"20%",marginRight:10,marginBottom:17}} ref='b' placeholder='请输入名称' />
                                <Button type="primary" htmlType="submit" style={{marginTop:1}} onClick={this.handleSearch}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset} loading={loadingReset}>
                                    重置
                                </Button>
                        </div>
                       
                    }
                    action={<div className="action">
                        
                    </div>}
                    extraContent={<div className="extraContent"><Button type="primary" htmlType="submit" onClick={this.addStackItem}>新增股票</Button></div>}
                    onTabChange={this.onTabChange}
                />
                <div id="bodyDiv" className="tableBox">
                    <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id}
                        // rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        bordered
                    />
                    <Modal
                        title="新增股票"
                        visible={this.state.modalvisible}
                        onOk={this.modalOk}
                        onCancel={this.modalCan}
                    >
                        <p><label>股票代码：</label><Input ref='code' style={{width:"66%"}} type='text'/></p>
                        <p><label>股票名称：</label><Input ref='name' style={{ width: "66%" }} type='text'/></p>
                        <p style={{marginLeft:70,color:'red'}}>{this.state.ErMsg}</p>
                    </Modal>

                </div >
            </div>
        )

    }

    modalOk = () => {
        console.log(111)
        let item ={
            code: this.refs.code.input.value,
            name: this.refs.name.input.value
        }
        console.log(item)
        if (item.code.length == 0 || item.name.length == 0){
            this.setState({
                ErMsg:'×输入项不能为空'
            })
            return;
        }
        addStack(item,(action)=>{
            this.props.dispatch(action)
            console.log('list',this.props.usersList)
            if(this.props.usersList.code == 0){
                this.setState({
                    modalvisible: false
                })
                this.modalCan()
                this.refresh()
            } else if (this.props.usersList.code > 0){
                this.setState({
                    ErMsg: this.props.usersList.message
                })
            }
        })
        
    }
    modalCan = ()=>{
        this.refs.code.input.value = ''
        this.refs.name.input.value = ''
        this.setState({
            modalvisible:false,
            ErMsg:''
        })
    }
    //点击删除按钮的操作
     
    removeStackId = (record) => {
        removeStack(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })

    }
  
    //点击查询按钮后
    handleSearch = () => {
        // console.log(this.refs.a.refs.input.value)
        let item = {
            code: this.refs.a.input.value ? this.refs.a.input.value:null,
            name: this.refs.b.input.value ? this.refs.b.input.value:null,
        }
        searchStockList(item, (action) => {
            this.props.dispatch(action)
            console.log(this.props.usersList)
            // filterUsersList(users)
            this.setState({
                data: this.props.usersList.data.result,
                pagination: {
                    total: this.props.usersList.data.total,
                    pageSize: this.props.usersList.data.pageSize,

                }
            })

        })
    }
    
    addStackItem = () =>{
        this.setState({
            modalvisible:true
        })
    }
  
}
function filterUsersList(store) {
    // console.log(store);
    return {
        usersList: store.stockManagement
    }
}

export default connect(filterUsersList)(StockManagement)
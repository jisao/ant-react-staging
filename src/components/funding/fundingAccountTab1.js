import React from "react";
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import { Table, Button, Input, Modal, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, Tag ,notification} from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getfundingAccount, changeAutoOutList,searchfundingAccount,winOpen ,addExcel,checkLogList} from "../../redux/actions/acFunding/acFundingAccount";
import { setTimeout } from "timers";


require("./fundingAccount.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

//定义系统设置的资源码
const systemSetup = [
    { name: '账户管理-修改按钮', bool: false },
    { name: '账户管理-打开客户端按钮', bool: false },
]

class fundingAccount extends React.Component {


    state = {
        systemSetupData:[],
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '配资管理',
            }, {
                title: '账户管理',
            }],
        columns: [
            {
                title: "账号",
                dataIndex: 'account',
                width:220,
                fixed:'left',
                render: (text, record) =>
                    <div>
                        <span   style={{marginRight:8}}>{record.account}</span>
                        {/* <Tag color="cyan">证券账户：{record.stockAccount}</Tag> */}
                        <Tag color="geekblue">{record.period == "DAY" ? <span>天</span> : record.period == "MONTH" ? <span>月</span> : record.period == "NEW" ? <span>新手体验</span> : <span>{record.period}</span>}</Tag>
                        <Tag color="purple">{record.multiple}倍</Tag>
                    </div>
            },
            {
                title: "用户",
                dataIndex: 'appUser',
                width:140,
            },
            {
                title: "证券账户",
                dataIndex: 'stockAccount',
                width:140,
            },
            {
                title: "总金额",
                dataIndex: 'allAmount',
                width:120,
            },
            {
                title: "初始投入",
                dataIndex: "initial",
                width:120,
            },
            {
                title: "可用余额",
                dataIndex: "balance",
                width:120,
            },
            {
                title: "买入冻结",
                dataIndex: "buyBlock",
                width:120,
            },
            {
                title: "警戒线",
                dataIndex: "danger",
                width:120,
            },
            {
                title: "止损线",
                dataIndex: "stop",
                width:120,
            },
            {
                title: "创业板持仓",
                dataIndex: "gePercent",
                width:140,
            },
            {
                title: "单票持仓",
                dataIndex: "signalPercent",
                width:120,
            },
            {
                title: "平仓状态",
                dataIndex: "stopState",
                width:120,
                render:(text)=>
                    <div>{text == 'NORMAL'?<div>正常</div>:text == 'WILL_STOP'?
                    <div>准备平仓</div>:text == 'STOP_BEGIN'?
                    <div>开始平仓</div>:text == 'STOPING'?
                    <div>平仓中</div>:text == 'STOP'?
                    <div>完成平仓</div>:text == 'AUDIT'?
                    <div>结清审核</div>:<div>{text}</div>}</div>
            },
            // {
            //     title: "activeTime",
            //     dataIndex: "activeTime",
            // },
            {
                title: "手续费率",
                dataIndex: "feePercent",
                width:120,
            },
            
            {
                title: "管理费状态",
                dataIndex: "feeState",
                width:140,
                render:(text)=>
                    // <div>{text == 'NORMAL'?<div>正常</div>:text == 'ABNORMAL'?<div>异常</div>:<div>{text}</div>}</div>
                    text == "NORMAL" ? <Badge status="success" text={'正常'} /> :text == 'ABNORMAL'? <Badge status="error" text={'异常'} />:<div>{text}</div>
            },
            {
                title: "状态",
                dataIndex: "state",
                width:120,
                render: (text) =>
                    <div>{
                        text == "WAIT" ? <div>新增</div> :
                            (text == "RUNNING" ? <div>交易中</div> :
                                text == "STOP_BEGIN" ? <div>开始平仓</div> :
                                    text == "STOPING" ? <div>平仓中</div> :
                                        text == "STOP" ? <div>平仓完成</div> :
                                            text == "BLOCK" ? <div>冻结状态</div> : <div>{text}</div>)
                    }
                    </div>
            },
            {
                title: "自动平仓",
                dataIndex: 'autoOut',
                width:120,
                render: (text) =>
                    <div>{
                        text == "YES" ? <div>是</div> : <div>否</div>
                    }
                    </div>
            },
            {
                title: "操作",
                key: "action",
                width:240,
                fixed:'right',
                render: (record) =>
                    <div>
                        <a onClick={()=>{this.checkLog(record.account)}}>登录日志</a>
                        &nbsp;&nbsp;  {systemSetup[0].bool && systemSetup[1].bool ?<span>|</span>:''}&nbsp;&nbsp;
                        {systemSetup[0].bool ?<a onClick={() => { this.changeAutoOut(record) }}>修改</a>:''}
                        &nbsp;&nbsp;  {systemSetup[0].bool && systemSetup[1].bool ?<span>|</span>:''}&nbsp;&nbsp;
                        {systemSetup[1].bool ?<a onClick={() => { this.openStaticTrade(record) }}>打开交易端</a>:''}
                    </div>
            }
        ],
        columns1:[
            {
                title: "登录时间",
                dataIndex: 'gmtCreate',
                render: (text) =>
                <div>{this.formatDate(text)}</div>
            },
            {
                title: "IP地址",
                dataIndex: 'ip',
            },
            {
                title: "登录成功",
                dataIndex: 'state',
                render:(text)=>
                <div>{text == 'SUCCESS'?<div>成功</div>:text == 'FAIL'?<div>失败</div>:<div>{text}</div>}</div>
            },
        ],
        itemList: [],
        loading: false,
        titleMsg: '',
        modalvisible: false,

        itemList1: [],
        loading1: false,
        titleMsg1: '',
        modalvisible1: false,

        defaultValue: '',
        itemId: 256,
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
      
        erMsg:'',
        stopState:'',
        checkLogId:256,

    }

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

    render() {
        return (
            <div>
                    <div>
                            <div className="tableBox">
                            <InputGroup >
                                    <Input style={{ width:180,marginRight:20,marginBottom:20}} ref='acc'  placeholder='请输入账号' />
                                    <Select style={{marginRight:20}} value={this.state.stopState} onChange={value => this.searchState(value)} >
                                        <Option value="">请选择平仓状态</Option>
                                        <Option value="NORMAL">正常</Option>
                                        <Option value="WILL_STOP">准备平仓</Option>
                                        <Option value="STOP_BEGIN">开始平仓</Option>
                                        <Option value="STOPING">平仓中</Option>
                                        <Option value="STOP">完成平仓</Option>
                                        <Option value="AUDIT">结清审核</Option>
                                    </Select>
                                    <Button style={{ marginRight:20 }} type="primary" onClick={this.submit}>查询</Button>
                                    <Button style={{ marginRight:20 }} onClick={this.refresh}  >重置</Button>
                                    <Button style={{  }} onClick={this.excel}  >生成EXCEL</Button>
                            </InputGroup>
                                <Table columns={this.state.columns} dataSource={this.state.itemList} rowKey={record => record.account}
                                    loading={this.state.loading}
                                    bordered
                                    pagination={this.state.pagination}
                                    onChange={this.handleTableChange}
                                    scroll={{ x: 2200 }}
                                />
                                <Modal
                                    title={this.state.titleMsg}
                                    visible={this.state.modalvisible}
                                    onOk={this.modalOK}
                                    onCancel={this.modalCa}
                                >
                                    <div><label>创业持仓：</label><Input style={{width:'66%',marginBottom: "20px"}} ref='gePercent'></Input></div>
                                    <div><label>单票持仓：</label><Input style={{width:'66%',marginBottom: "20px"}} ref='signalPercent'></Input></div>
                                    <div><label>手续费率：</label><Input style={{width:'66%',marginBottom: "20px"}} ref='feePercent'></Input></div>
                                    <div><label>自动平仓：</label><Select style={{width:'100px',marginBottom: "20px"}} defaultValue={this.state.defaultValue} onSelect={value => this.changeState(value)}>
                                        <Option value="YES">是</Option>
                                        <Option value="NO">否</Option>
                                    </Select></div>
                                    <p style={{color:"red",marginLeft: '70px'}}>{this.state.erMsg}</p>
                                </Modal>

                                <Modal
                                    width='55%'
                                    title={this.state.titleMsg1}
                                    visible={this.state.modalvisible1}
                                    onOk={this.modalOK1}
                                    onCancel={this.modalCa1}
                                >
                                    <Table columns={this.state.columns1}  dataSource={this.state.itemList1} rowKey={record => record.id}
                                        loading={this.state.loading1}
                                        bordered
                                        pagination={this.state.pagination1}
                                        onChange={this.handleTableChange1}
                                    />
                                  
                                </Modal>
                            </div >
                    </div>
            </div>
        )

    }

    //换页
    handleTableChange = (pagination) => {
        // console.log(pagination)
        this.setState({ loading: true });
        setTimeout(() => {
            getfundingAccount(pagination.current, pagination.pageSize, (action) => {
                this.props.dispatch(action);
                console.log(this.props.fundingAccountList)
                this.setState({
                    itemList: this.props.fundingAccountList.data.result,
                    pagination: {
                        current:this.props.fundingAccountList.data.pageNo,
                        total: this.props.fundingAccountList.data.total,
                        pageSize: this.props.fundingAccountList.data.pageSize,

                    }
                });
            })
            this.setState({ loading: false });
        }, 200);

    };

    //换页登录日志
    handleTableChange1 = (pagination) => {
        // console.log(pagination)
        this.setState({ loading1: true });
        setTimeout(() => {
            checkLogList(this.state.checkLogId,'TRADE',pagination.current, pagination.pageSize, (action) => {
                this.props.dispatch(action);
                console.log(this.props.fundingAccountList)
                this.setState({
                    itemList1: this.props.fundingAccountList.data.result,
                    pagination1: {
                        current:this.props.fundingAccountList.data.pageNo,
                        total: this.props.fundingAccountList.data.total,
                        pageSize: this.props.fundingAccountList.data.pageSize,

                    }
                });
            })
            this.setState({ loading1: false });
        }, 200);

    };

    refresh = () => {
        this.refs.acc.input.value = ''
        this.setState({ loading: true,stopState:'' });
        getfundingAccount(1,10,(action) => {
            this.props.dispatch(action)
            console.log(this.props.fundingAccountList.data.result)
            this.setState({
                loading: false,
                itemList: this.props.fundingAccountList.data.result,
                pagination: {
                    current:this.props.fundingAccountList.data.pageNo,
                    total: this.props.fundingAccountList.data.total,
                    pageSize: this.props.fundingAccountList.data.pageSize,
                }
            })
            // console.log(this.state.itemList)
        })
    }

        // 初始化获取权限
        componentWillMount() {
            this.setState({
                systemSetupData: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
            })
        }
    
        componentDidMount() {
            let arr = this.state.systemSetupData
            for (let i = 0; i < systemSetup.length; i++) {
                if (arr.indexOf(systemSetup[i].name) != -1) {
                    systemSetup[i].bool = true
                } else {
                    systemSetup[i].bool = false
                }
            }
            this.refresh()
        }
    changeAutoOut = (record) => {
        console.log(record.gePercent)
        setTimeout(() => {
            this.setState({
                itemId: record.id,
                titleMsg: `账号：${record.account}`,
                modalvisible: true,
                defaultValue: record.autoOut,
                erMsg:''
            })
            this.refs.gePercent.input.value = record.gePercent
            this.refs.signalPercent.input.value = record.signalPercent
            this.refs.feePercent.input.value = record.feePercent
        }, 500);
        
     
    }
    changeState = (value) => {
        this.setState({
            defaultValue: value
        }, () => { console.log(this.state.defaultValue) })
    }


    modalOK = () => {
        let percent = {
            gePercent:  this.refs.gePercent.input.value,
            feePercent: this.refs.feePercent.input.value,
            signalPercent: this.refs.signalPercent.input.value 
        }
      
        for(let value in percent){
            if(percent[value].length == 0){
                this.setState({
                    erMsg:'×输入项不能为空'
                })
                return;
            }
        }
        changeAutoOutList(this.state.itemId, this.state.defaultValue,percent,(action) => {
            this.props.dispatch(action)
            if(this.props.fundingAccountList.code == 0){
                this.modalCa()
                this.refresh()
            }else {
                this.setState({
                    erMsg:this.props.fundingAccountList.message
                })
            }
        })
    }

    modalCa = () => {
        this.setState({
            modalvisible: false,
            erMsg:'',
        })
    }
    searchState =(value)=>{
        console.log(value)
        this.setState({
            stopState:value
        })
    }
    submit = ()=>{
        console.log(this.state.stopState)
        let id = this.refs.acc.input.value
        searchfundingAccount(id,this.state.stopState,(action) => {
            this.props.dispatch(action)
            console.log(this.props.fundingAccountList.data.result)
            this.setState({
                loading: false,
                itemList: this.props.fundingAccountList.data.result,
                pagination: {
                    current:this.props.fundingAccountList.data.pageNo,
                    total: this.props.fundingAccountList.data.total,
                    pageSize: this.props.fundingAccountList.data.pageSize,
                }
            })
            // console.log(this.state.itemList)
        })
    }

    //生成EXCEL
    excel = ()=>{
        let id = this.refs.acc.input.value
        addExcel(id,this.state.stopState,(action)=>{
            this.props.dispatch(action)
            console.log(this.props.fundingAccountList.data)
            if (this.props.fundingAccountList.code == 0) {
                this.openNotificationWithIcon('success', '操作成功，正在为你生成EXCEL！')
                console.log("ok", this.props.fundingAccountList)
                this.refresh()
            } else {
                this.openNotificationWithIcon('error', this.props.fundingAccountList.message)
            }
        })
    }

       //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };

    //打开独立交易端
    openStaticTrade=(record)=>{
        winOpen(record.account,(action)=>{
            this.props.dispatch(action)
            if(this.props.fundingAccountList.code == 0){
                console.log(this.props.fundingAccountList)
                sessionStorage.setItem('xinghuoniu-trade-static-accessKey',this.props.fundingAccountList.data.accessKey)
                window.open('./trade/index.html')
            }else{
                notification.open({
                    message: '警告',
                    description:this.props.fundingAccountList.message ,
                });
            }
        })
    }

    modalCa1 = () => {
        this.setState({
            modalvisible1: false,
        })
    }
    modalOK1 = () => {
        this.setState({
            modalvisible1: false,
        })
    }

    //打开登录日志
    checkLog = (record)=>{
        console.log(record)
        this.setState({
            modalvisible1:true,
            titleMsg1:`账号${record}登录日志`,
            checkLogId:record
        })
        checkLogList(record,'TRADE',1,10,(action)=>{
            this.props.dispatch(action)
            console.log(this.props.fundingAccountList.data)
            this.setState({
                itemList1:this.props.fundingAccountList.data.result,
                pagination1: {
                    current:this.props.fundingAccountList.data.pageNo,
                    total: this.props.fundingAccountList.data.total,
                    pageSize: this.props.fundingAccountList.data.pageSize,

                }
            })
        })
    }
}

function filterfundingAccount(store) {
    // console.log(store);
    return {
        fundingAccountList: store.fundingAccount
    }
}

export default connect(filterfundingAccount)(fundingAccount)

import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { ChartCard, yuan, Pie, } from 'ant-design-pro/lib/Charts';
import { getSecurityManage, addAmount } from "../../redux/actions/acSecurity/acSecurityManage";


require("./securityManage.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
//定义系统设置的资源码
const systemSetup  = [
    { name: '证券-账户-追加金额按钮',bool:false}
]


class securityManage extends React.Component {
 

    state = {
        // 用户权限的数组
        data:[],
        seeIt:false,
        pieData:[
           
        ],
        pieTitle:'总资金',
        pagination: {
            // current: 1,
            pageSize: 100,
            total: 0
        },
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '证券管理',
            }, {
                title: '账户管理',
            }],
        columns: [
            {
                title: "账号",
                dataIndex: 'stockAccount.account',
            }, 
            {
                title: "账号ID",
                dataIndex: 'stockAccount.accountId',
            }, 
            {
                title: "券商",
                dataIndex: "stockAccount.bondName"
            }, 
            {
                title: "银行",
                dataIndex: "stockAccount.bank"
            }, 
            {
                title: "开户行",
                dataIndex: "stockAccount.bankAccount"
            }, 
            {
                title: "卡号",
                dataIndex: "stockAccount.bankCard"
            }, 
            {
                title: "银行图标",
                dataIndex: "stockAccount.bankIcon"
            }, 
            {
                title: "真实名称",
                dataIndex: "stockAccount.fullName"
            }, 
            {
                title: "费率",
                dataIndex: "stockAccount.feeRate"
            }, 
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{
                        text == "NORMAL" ? <Badge status="success" text={'正常'} /> : <Badge status="error" text={'异常'} />
                    }

                    </div>
            }],
        itemList: [],
        loading: false,
        titleMsg:'',
        modalvisible:false,

        
    }
    //换页
    handleTableChange = (pagination) => {
        // console.log(pagination)
        // this.setState({ loading: true });
        // setTimeout(() => {
        //     getUsersList(pagination.current, (action) => {
        //         this.props.dispatch(action);
        //     })
        //     this.setState({ loading: false });
        // }, 200);

    };
    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="账户管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox">
                    <Table columns={this.state.columns} pagination={this.state.pagination} dataSource={this.state.itemList} rowKey={record => record.stockAccount.account}
                        loading={this.state.loading}
                        bordered
                        onChange={this.handleTableChange}
                        expandedRowRender={record => 
                            <div>
                                <div><h3>平台统计:</h3>{this.expandedRowRender(record.stat)}</div>
                                <div><h3 style={{marginTop:11}}>真实资产:</h3>{this.expandedRowRender1(record.real)}</div>
                                <div><h3 style={{marginTop:11}}>对账列表:</h3>{this.expandedRowRender2(record.checking)}</div>
                            </div>

                        }
                    />
                    <Modal
                        title={this.state.titleMsg}
                        visible={this.state.modalvisible}
                        onOk={this.modalOK}
                        onCancel={this.modalCa}
                    >
                        <label>追加资金：</label><Input style={{ width: '66%' }} ref='amount'></Input>
                    </Modal>
                </div >
            </div>
        )

    }
    onTabChange = (key) => {
        console.log(key)
    }
    refresh = () => {
        this.setState({ loading: true });
        getSecurityManage((action) => {
            this.props.dispatch(action)
            // console.log(this.props.securityManageList.data.result)
            this.setState({
                loading: false,
                itemList: this.props.securityManageList.data.result
            })
            console.log(this.state.itemList)
        })
    }

    // 初始化获取权限
    componentWillMount() {
        this.setState({
            data: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
        })
    }

    componentDidMount() {
        let arr = this.state.data
        for (let i = 0; i < systemSetup.length; i++) {
            if (arr.indexOf(systemSetup[i].name) != -1) {
                systemSetup[i].bool = true
            } else {
                systemSetup[i].bool = false
            }
        }
        console.log(systemSetup)
        this.refresh()

    }
    //下面两个都是生成子的TABLE
    expandedRowRender = (stat) => {
        const columnss = [
            
            {
                title: "资金池余额",
                dataIndex: 'pltBalance',
                width: '25%'
            },
            {
                title: "已配资",
                dataIndex: 'pltPeizi',
                width: '25%'
            },
            // {
            //     title: "用户保证金",
            //     dataIndex: 'stat.userAmount',
            // },
            {
                title: "垫付保证金",
                dataIndex: 'pltBz',
                width: '25%'
            },
            {
                title: "储备资金池",
                dataIndex: 'pltAmount',
                width: '25%',
                render:(text,record)=>
                    <div>
                        <span>{text}</span>&nbsp;&nbsp;
                        {systemSetup[0].bool?<Button onClick={() => { this.addMoney(record) }} type="default" size="small"><Icon type="plus" />追加金额</Button>:''}
                    </div>
            },
        ]
        let arr = []
        arr.push(stat)
        return (
            <Table
                rowKey={record => record.pltBalance}
                columns={columnss}
                dataSource={arr}
                pagination={false}
            />
        )
    }
    expandedRowRender1 = (real) => {
        const columnsss = [
            {
                title: "冻结",
                dataIndex: 'block',
                width:'25%'
            },
            {
                title: "账户余额",
                dataIndex: 'balance',
                width: '25%'
            },
            {
                title: "可用资金",
                dataIndex: 'canUse',
                width: '25%'
            },
            
            {
                title: "总资产",
                dataIndex: 'total',
                width: '25%'
            },
        ]
       let arr = []
       arr.push(real)
        return (
            <Table
                rowKey={record => record.balance}
                columns={columnsss}
                dataSource={arr}
                pagination={false}
            />
        )
    }
    expandedRowRender2 = (checking) => {
        const columnssss = [
         
            {
                title: "真实余额",
                dataIndex: 'realBalance',
                width: '25%'
            },
            {
                title: "对账余额",
                dataIndex: 'statBalance',
                width: '25%'
            },  
            {
                title: "对账时间",
                dataIndex: 'checkTime',
                width:'25%',
                render:(text)=>
                <div>{
                    this.formatDate(text)
                }</div>
            },
        ]
        
        return (
            <Table
                rowKey={record => record.checkTime}
                columns={columnssss}
                dataSource={checking}
                pagination={false}
            />
        )
    }
    //弹窗的关闭按钮
    modalCa = ()=>[
        this.setState({
            modalvisible:false
        })
    ]
    //点击添加资金后
    addMoney = (record)=>{
        this.setState({
            amountId: record.id,
            titleMsg: `为${record.stockAccount.account}账户添加资金`,
            modalvisible: true
        })
    }
    //添加资金确认
    modalOK = ()=>{
        let amount = this.refs.amount.input.value
        addAmount(this.state.amountId,amount,(action)=>{
            this.props.dispatch(action)
            this.modalCa()
            this.refresh()
        })
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
}

function filtersecurityManage(store) {
    console.log(store);
    return {
        securityManageList: store.securityManage
    }
}

export default connect(filtersecurityManage)(securityManage)

import React from "react";
import { Table, Button, Input, Modal, Icon, Tabs, Select, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getPtDepositList, getJiuPaiList,getJiuPaiDRList, getYinZZList, jiupaiToBankList, yinZZToBondList, getYinZZHistroyList } from "../../redux/actions/acPtDeposit/acPtDeposit";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const InputGroup = Input.Group;

//定义系统设置的资源码
const systemSetup = [
    { name: '平台保证金(子模块)-确定按钮', bool: false }
]

class PtDeposit extends React.Component {
    state = {
        systemSetupData:[],
        accountData:[],
        accountId:'',
        modalvisible:false,
        activeKey:'0',
        msg:'',
        breadcrumbList: [
            {
            title: '首页',
            href: '#/main/index',
            }, {
                title: '平台保证金',
            }, {
                title: '平台保证金',
        }],
//====================================
        jiuPaiData:[],
        jiuPaiDRData:[],
        jiupaiAmount:'',
        jiupaiBackCard:'',
        jiupaiIds:[],
        jiuPaiPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        jiuPaiDRPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        jiuPaiColumns: [
            {
                title: "交易账户",
                dataIndex: "personAccount"
            },
            {
                title: "股票账户",
                dataIndex: "stockAccount"
            },
            {
                title: "订单ID",
                dataIndex: 'orderId',
            },
            {
                title: "垫付金额",
                dataIndex: "amount"
            },
        
            {
                title: "类型",
                dataIndex: 'type',
                render:(text)=>
                    <div>{
                        text == "PEIZI" ? <div>配资</div> : text == "APPEND_BZJ" ? <div>追加保证金</div> : text == "APPEND_QUOTA" ? <div>追加配额</div> :''
                    }</div>
            },
       
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render:(text)=>
                    <div>{this.formatDate(text)}</div>
        }],
//=====================================
        yinZZData:[],
        yinZZAmountCard: '',
        yinZZBond:'',
        yinZZIds:[],
        yinZZPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        yinZZColumns: [
            {
                title: "交易账户",
                dataIndex: "personAccount"
            },
            {
                title: "股票账户",
                dataIndex: "stockAccount"
            }, 
            {
                title: "订单ID",
                dataIndex: 'orderId',
            },
            {
                title: "金额",
                dataIndex: "amount"
            },
          
            {
                title: "支付方式",
                dataIndex: 'payWay',
                render: (text) =>
                    <div>{
                        text == "JIUPAI" ? <div>九派支付</div> : text == "RECEIPT" ? <div>银行转账</div> : <div>{text}</div>
                    }</div>
            }, 
            {
                title: "支付状态",
                dataIndex: 'state',
                render: (text) =>
                    <div>{
                        text == "DIANFU" ? <div>垫付</div> : text == "TOY" ? <div>转入银行卡</div> : text == "YTOZ" ? <div>银转证</div> : <div>{text}</div> 
                    }</div>
            }, 
            {
                title: "类型",
                dataIndex: 'type',
                render: (text) =>
                    <div>{
                        text == "PEIZI" ? <div>配资</div> : text == "APPEND_BZJ" ? <div>追加保证金</div> : text == "APPEND_QUOTA" ? <div>追加配额</div> : <div>{text}</div> 
                    }</div>
            }, 
          
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render: (text) =>
                    <div>{this.formatDate(text)}</div>
        }],
//=====================================
        yinZZHistroyData:[],
        yinZZHistroyPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        yinZZHistroyColumns: [
            {
                title: "交易账户",
                dataIndex: "personAccount"
            },
            {
                title: "股票账户",
                dataIndex: "stockAccount"
            }, 
            {
                title: "订单ID",
                dataIndex: 'orderId',
            },
            {
                title: "金额",
                dataIndex: "amount"
            },
            {
                title: "支付方式",
                dataIndex: 'payWay',
                render: (text) =>
                    <div>{
                        text == "JIUPAI" ? <div>九派支付</div> : text == "RECEIPT" ? <div>银行转账</div> : <div>{text}</div>
                    }</div>
            }, 
            {
                title: "支付状态",
                dataIndex: 'state',
                render: (text) =>
                    <div>{
                        text == "DIANFU" ? <div>垫付</div> : text == "TOY" ? <div>转入银行卡</div> : text == "YTOZ" ? <div>银转证</div> : <div>{text}</div> 
                    }</div>
            }, 
            {
                title: "类型",
                dataIndex: 'type',
                render: (text) =>
                    <div>{
                        text == "PEIZI" ? <div>配资</div> : text == "APPEND_BZJ" ? <div>追加保证金</div> : text == "APPEND_QUOTA" ? <div>追加配额</div> : <div>{text}</div> 
                    }</div>
            }, 
         
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render: (text) =>
                    <div>{this.formatDate(text)}</div>
        }]
    };


    refresh = () => {
        getPtDepositList((action)=>{
            this.props.dispatch(action)
            if (this.props.ptDepositList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.ptDepositList.message
                })
                return;
            }
            if (this.props.ptDepositList.data.result){
                let arr = this.props.ptDepositList.data.result
                let arr1 = []
                //用来把正常的账户选出来
                for (let value of arr) {
                    if (value.state == 'NORMAL') {
                        arr1.push(value)
                    }
                }
                this.setState({
                    accountData: arr1,
                })
            }
       
        })
    };
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
    //jiuPai换页
    jiuPaihandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getJiuPaiList(pagination.current, pagination.pageSize, this.state.accountId,(action) => {
                this.props.dispatch(action);
                this.setState({
                    jiuPaiData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : []
                })
            })
        }, 200);

    };
    //jiuPai当日换页
    jiuPaiDRhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getJiuPaiDRList(pagination.current, pagination.pageSize, this.state.accountId,(action) => {
                this.props.dispatch(action);
                this.setState({
                    jiuPaiDRData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : []
                })
            })
        }, 200);

    };
    //yinZZ换页
    yinZZhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getYinZZList(pagination.current, pagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);
                this.setState({
                    yinZZData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result:[]
                })
            })
        }, 200);

    };
    //Histroy换页
    yinZZHistroyhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getYinZZHistroyList(pagination.current, pagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);
                this.setState({
                    yinZZHistroyData: this.props.ptDepositList.data.result
                })
            })
        }, 200);

    };
    //下面函数时为了切换TABS
    tabsOnChange = (key) => {
        console.log(key)
        if (key == "1") {
            this.setState({
                activeKey: "1"
            });
        } else if(key =='2') {
            this.setState({
                activeKey: "2"
            });
        } else if (key == '3') {
            this.setState({
                activeKey: "3"
            });
        }else if (key == '0') {
            this.setState({
                activeKey: "0"
            });
        }
    }
    //选择不同的账户信息
    searchState = (value) => {
        getJiuPaiList(1, this.state.jiuPaiPagination.pageSize,value,(action)=>{
            this.props.dispatch(action)
            if (this.props.ptDepositList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.ptDepositList.message
                })
                return;
            }
            console.log(this.props.ptDepositList)
            this.setState({
                accountId:value,
                jiuPaiPagination: {
                    total: this.props.ptDepositList.data.total,
                    pageSize: this.props.ptDepositList.data.pageSize,
                },
                jiuPaiData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : [],
                jiupaiBackCard: this.props.ptDepositList.data.bankCard ? this.props.ptDepositList.data.bankCard:'',
                jiupaiAmount: '从九派转' + this.props.ptDepositList.data.amount,
                jiupaiIds: this.props.ptDepositList.data.ids
            })
        })
        getJiuPaiDRList(1, this.state.jiuPaiDRPagination.pageSize,value,(action)=>{
            this.props.dispatch(action)
            if (this.props.ptDepositList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.ptDepositList.message
                })
                return;
            }
            console.log(this.props.ptDepositList)
            this.setState({
                accountId:value,
                jiuPaiDRPagination: {
                    total: this.props.ptDepositList.data.total,
                    pageSize: this.props.ptDepositList.data.pageSize,
                },
                jiuPaiDRData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : [],
                // jiupaiBackCard: this.props.ptDepositList.data.bankCard ? this.props.ptDepositList.data.bankCard:'',
                // jiupaiAmount: '从九派转' + this.props.ptDepositList.data.amount,
                // jiupaiIds: this.props.ptDepositList.data.ids
            })
        })
        getYinZZList(1, this.state.yinZZPagination.pageSize,value,(action)=>{
            this.props.dispatch(action)
            if (this.props.ptDepositList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.ptDepositList.message
                })
                return;
            }
            this.setState({
                accountId: value,
                yinZZPagination:{
                    total: this.props.ptDepositList.data.total,
                    pageSize: this.props.ptDepositList.data.pageSize,
                },
                yinZZAmountCard: '从' + this.props.ptDepositList.data.bankCard + `转` + this.props.ptDepositList.data.amount,
                yinZZBond: this.props.ptDepositList.data.bond ? this.props.ptDepositList.data.bond:'',
                yinZZData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : [],
                yinZZIds: this.props.ptDepositList.data.ids
            })
        })
        getYinZZHistroyList(1, this.state.yinZZHistroyPagination.pageSize,value,(action)=>{
            this.props.dispatch(action)
            if (this.props.ptDepositList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.ptDepositList.message
                })
                return;
            }
            this.setState({
                accountId: value,
                yinZZHistroyData: this.props.ptDepositList.data.result,
                yinZZHistroyPagination:{
                    total: this.props.ptDepositList.data.total,
                    pageSize: this.props.ptDepositList.data.pageSize,
                },
            })
        })
       
    }



    //render那个下拉单
    contentRender = ()=>{
    
        const options = this.state.accountData.map(d => <Option key={d.id}>{`${d.bondName} ${d.account}`}</Option>);
        return <div>
            {/* <Select style={{ width: 140 }} onSelect={value => this.searchState(value)} defaultValue='请选择账户：'> */}
            <Select style={{ minWidth: 210 }} onSelect={value => this.searchState(value)} defaultValue='请选择账户：'>
                {options}
            </Select>
        </div>
       
    }
    
    

    render() {
        // const options = this.state.accountData.map(d => <Option key={d.id}>{d.bondName}</Option>);
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="平台保证金"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content={this.contentRender()}
                    action=''
                    extraContent={<div className="extraContent">
                        {systemSetup[0].bool ?
                         <div className="action" style={{ display: this.state.accountId ? 'block' : 'none' }} >
                            <InputGroup compact style={{ display: this.state.activeKey == '1' && this.state.jiuPaiData.length > 0 ? 'block' : 'none' }} >
                                    <Input style={{ width:this.state.jiupaiAmount.length*14 ,textAlign:'center' }} ref='biginning' value={this.state.jiupaiAmount} disabled />
                                <Input style={{ width: 40, pointerEvents: 'none', backgroundColor: '#fff', textAlign: 'center' }} placeholder="到" disabled />
                                    <Input style={{ width: this.state.jiupaiBackCard.length * 14, textAlign: 'center'}} ref='biginning' value={this.state.jiupaiBackCard} disabled />
                                <Button style={{ borderRightWidth: 1 }} type="primary" onClick={this.submit}>确定</Button>
                            </InputGroup>
                            <InputGroup compact style={{ display: this.state.activeKey == '2' && this.state.yinZZData.length>0? 'block' : 'none' }} >
                                    <Input style={{ width: this.state.yinZZAmountCard.length * 10 , textAlign: 'center' }} ref='biginning'  disabled value={this.state.yinZZAmountCard} />
                                <Input style={{ width: 40, pointerEvents: 'none', backgroundColor: '#fff', textAlign: 'center' }} placeholder="到" disabled />
                                    <Input style={{ width: this.state.yinZZBond.length * 22,textAlign: 'center'}} ref='biginning' value={this.state.yinZZBond} disabled />
                                <Button style={{ borderRightWidth: 1 }} type="primary">
                                        <Popconfirm title="确定要操作吗?" onConfirm={() => this.submit()}>
                                            <a href="#">确认</a>
                                        </Popconfirm>
                                </Button>
                            </InputGroup>
                        </div>:''}
                    </div>}
                />
                <div id="bodyDiv" className="tableBox">
                    <Tabs defaultActiveKey="0" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="九派当日垫付" key="0">
                            <Table columns={this.state.jiuPaiColumns} dataSource={this.state.jiuPaiDRData} rowKey={record => record.id}
                                pagination={this.state.jiuPaiDRPagination}
                                // loading={this.state.loading}
                                onChange={this.jiuPaiDRhandleTableChange}
                                bordered/>
                        </TabPane>
                        <TabPane tab="九派垫付列表" key="1">
                            <Table columns={this.state.jiuPaiColumns} dataSource={this.state.jiuPaiData} rowKey={record => record.id}
                                pagination={this.state.jiuPaiPagination}
                                // loading={this.state.loading}
                                onChange={this.jiuPaihandleTableChange}
                                bordered/>
                        </TabPane>
                        <TabPane tab='银转证列表' key="2">
                            <Table columns={this.state.yinZZColumns} dataSource={this.state.yinZZData} rowKey={record => record.id}
                                pagination={this.state.yinZZPagination}
                                // loading={this.state.loading}
                                onChange={this.yinZZhandleTableChange}
                                bordered />
                        </TabPane>
                        <TabPane tab='银转证历史列表' key="3">
                            <Table columns={this.state.yinZZHistroyColumns} dataSource={this.state.yinZZHistroyData} rowKey={record => record.id}
                                pagination={this.state.yinZZHistroyPagination}
                                // loading={this.state.loading}
                                onChange={this.yinZZHistroyhandleTableChange}
                                bordered />
                        </TabPane>
                    </Tabs>
                    <Modal
                        title="通知"
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
    submit = () =>{
        let key = this.state.activeKey
        if(key == '1'){
            jiupaiToBankList(this.state.jiupaiIds,(action)=>{
                this.props.dispatch(action)
                if (this.props.ptDepositList.code == 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.state.jiupaiAmount + '到' + this.state.jiupaiBackCard + '成功'
                    })
                } else if (this.props.ptDepositList.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.ptDepositList.message
                    })
                    return;
                }
            })
        }else if(key == '2'){
            yinZZToBondList(this.state.yinZZIds, (action) => {
                this.props.dispatch(action)
                if (this.props.ptDepositList.code == 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.state.yinZZAmountCard + '到' + this.state.yinZZBond + '成功'
                    })
                } else if (this.props.ptDepositList.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.ptDepositList.message
                    })
                    return;
                }
            })
        }
       
   
    }
    modalOk = () => {
        this.setState({
            modalvisible: false
        })
        if(this.props.ptDepositList.code == 0){
            getJiuPaiList(this.state.jiuPaiPagination.current, this.state.jiuPaiPagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);
                if (this.props.ptDepositList.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.ptDepositList.message
                    })
                    return;
                }
                this.setState({
                    jiuPaiData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : []
                })
            })
            getYinZZList(this.state.yinZZPagination.current, this.state.yinZZPagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);
                if (this.props.ptDepositList.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.ptDepositList.message
                    })
                    return;
                }
                this.setState({
                    yinZZData: this.props.ptDepositList.data.result ? this.props.ptDepositList.data.result : []
                })
            })
        }
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
function filterList(store) {
    // console.log(store);
    return {
        ptDepositList: store.ptDepositManage
    }
}

export default connect(filterList)(PtDeposit)
import React from "react";
import { Table, Button, Input, Modal, Icon, Tabs, Select, Popconfirm, DatePicker, Tag, notification } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getPtDepositList, getGLFList, getSXFList, tixianList, getTXList, txList, addExcel } from "../../redux/actions/acGain/acServiceCharge";

// require("./users.less")

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const InputGroup = Input.Group;
const dateFormat = 'YYYY-MM-DD';
//定义系统设置的资源码
const systemSetup = [
    { name: '手续费管理-确认按钮', bool: false }
]

//下文中的glf其实是说的是手续费！！！！！！！tab1是手续费管理  tab2是手续费历史

class ServiceCharge extends React.Component {
    state = {
        searchItem: {
            account: '',
            phone: '',
            startTime: '',
            endTime: '',
        },
        systemSetupData: [],
        accountData: [],
        defaultValue: '',
        accountId: '',
        modalvisible: false,
        activeKey: '1',
        msg: '',
        tabList1: [],
        tabList2: [],
        tabList3: [],
        start: '',
        end: '',
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '盈利管理',
            }, {
                title: '手续费管理',
            }],
        //====================================
        glfData: [],
        glfMsg: '',
        showButton:false,
        glfIds: [],
        glfPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        glfColumns: [
            {
                title: "真实姓名",
                dataIndex: "realName"
            },
            {
                title: "手机",
                dataIndex: "phone"
            },
            {
                title: "交易账户",
                dataIndex: "account"
            },
            {
                title: "股票代码",
                dataIndex: "stockCode"
            },
            {
                title: "单号",
                dataIndex: "delegate"
            },
            {
                title: "数量",
                dataIndex: "delegateCount"
            },
            {
                title: "价格",
                dataIndex: "delegatePrice"
            },
            // {
            //     title: "费用",
            //     dataIndex: "delegateFee"
            // },
            {
                title: "券商佣金",
                dataIndex: "bondFee"
            },
            {
                title: "印花税",
                dataIndex: 'stampFee',
            },
            {
                title: "过户费",
                dataIndex: 'transferFee',
            },
            {
                title: "平台成本",
                dataIndex: "pltFee"
            },
          


            {
                title: "交易方式",
                dataIndex: "delegateType",
                render: (text) =>
                    <div>{text == 'BUY' ? <div>买入</div> : text == 'SELL' ? <div>卖出</div> : <div>{text}</div>}</div>
            },
            {
                title: "委托日期",
                dataIndex: "delegateDay"
            },
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{text == 'NEW' ? <div>未提取</div> : text == 'WITHDRAW' ? <div>已提取</div> : <div>{text}</div>}</div>
            }],
        //====================================
        txData: [],
        txMsg: '',
        txIds: [],
        txPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },

        txColumns: [
            {
                title: "真实姓名",
                dataIndex: "realName"
            },
            {
                title: "手机",
                dataIndex: "phone"
            },
            {
                title: "交易账户",
                dataIndex: "account"
            },
            {
                title: "股票代码",
                dataIndex: "stockCode"
            },
            {
                title: "单号",
                dataIndex: "delegate"
            },
            {
                title: "数量",
                dataIndex: "delegateCount"
            },
            {
                title: "价格",
                dataIndex: "delegatePrice"
            },
            // {
            //     title: "费用",
            //     dataIndex: "delegateFee"
            // },
            {
                title: "券商佣金",
                dataIndex: "bondFee"
            },
            {
                title: "印花税",
                dataIndex: 'stampFee',
            },
            {
                title: "过户费",
                dataIndex: 'transferFee',
            },
            {
                title: "平台成本",
                dataIndex: "pltFee"
            },


            {
                title: "交易方式",
                dataIndex: "delegateType",
                render: (text) =>
                    <div>{text == 'BUY' ? <div>买入</div> : text == 'SELL' ? <div>卖出</div> : <div>{text}</div>}</div>
            },
            {
                title: "委托日期",
                dataIndex: "delegateDay"
            },
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{text == 'NEW' ? <div>未提取</div> : text == 'WITHDRAW' ? <div>已提取</div> : <div>{text}</div>}</div>
            }],
        //=====================================
        sxfData: [],
        sxfPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        sxfColumns: [
            {
                title: "真实姓名",
                dataIndex: "realName"
            },
            {
                title: "手机",
                dataIndex: "phone"
            },
            {
                title: "交易账户",
                dataIndex: "account"
            },
            {
                title: "股票代码",
                dataIndex: "stockCode"
            },
            {
                title: "单号",
                dataIndex: "delegate"
            },
            {
                title: "数量",
                dataIndex: "delegateCount"
            },
            {
                title: "价格",
                dataIndex: "delegatePrice"
            },
            // {
            //     title: "费用",
            //     dataIndex: "delegateFee"
            // },
            {
                title: "券商佣金",
                dataIndex: "bondFee"
            },
            {
                title: "印花税",
                dataIndex: 'stampFee',
            },
            {
                title: "过户费",
                dataIndex: 'transferFee',
            },
            {
                title: "平台成本",
                dataIndex: "pltFee"
            },


            {
                title: "交易方式",
                dataIndex: "delegateType",
                render: (text) =>
                    <div>{text == 'BUY' ? <div>买入</div> : text == 'SELL' ? <div>卖出</div> : <div>{text}</div>}</div>
            },
            {
                title: "委托日期",
                dataIndex: "delegateDay"
            },
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{text == 'NEW' ? <div>未提取</div> : text == 'WITHDRAW' ? <div>已提取</div> : text == 'TOBANK' ? <div>已转出</div> : <div>{text}</div>}</div>
            }],
    };


    refresh = () => {
        getPtDepositList((action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            }
            if (this.props.managementCostlList.data.result) {
                let arr = this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : []
                let arr1 = []
                //用来把正常的账户选出来
                for (let value of arr) {
                    if (value.state == 'NORMAL') {
                        arr1.push(value)
                    }
                }
                // console.log('账户信息', arr1)
                // console.log(arr1[0].bondName)
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
    //glf换页
    glfhandleTableChange = (pagination) => {
        // console.log(pagination)
        // this.setState({ loading: true });
        setTimeout(() => {
            getGLFList(pagination.current, pagination.pageSize, this.state.accountId, this.state.searchItem, (action) => {
                this.props.dispatch(action);
                console.log('listFY', this.props.managementCostlList)

                this.setState({
                    glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    glfPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
            // this.setState({ loading: false });
        }, 200);

    };
    //中间步骤换页
    txhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getTXList(pagination.current, pagination.pageSize, this.state.accountId, this.state.searchItem, (action) => {
                this.props.dispatch(action);
                this.setState({
                    txData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    txPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
        }, 200);

    };
    //sxf换页
    sxfhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getSXFList(pagination.current, pagination.pageSize, this.state.accountId, this.state.searchItem, (action) => {
                this.props.dispatch(action);
                this.setState({
                    sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    sxfPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
        }, 200);

    };
    //下面函数时为了切换TABS
    tabsOnChange = (key) => {
        if (key == "1") {
            this.setState({
                activeKey: "1"
            });
        } else if (key == '2') {
            this.setState({
                activeKey: "2"
            });
        } else if (key == '3') {
            this.setState({
                activeKey: "3"
            });
        }
    }
    //选择不同的账户信息
    searchState = (value) => {
        getGLFList(1, this.state.glfPagination.pageSize, value, this.state.searchItem, (action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message,

                })
                return
            } else if (this.props.managementCostlList.code == 0) {
                let num = this.props.managementCostlList.data.totalPltFee - this.props.managementCostlList.data.jiuPaiFee
                this.setState({
                    showButton:num >0?true:false,
                    accountId: value,
                    tabList1: this.props.managementCostlList.data,
                    glfIds: this.props.managementCostlList.data.ids,
                    glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    glfMsg: num>0?'从账户：' + this.props.managementCostlList.data.bondAccount + '中提出' + num + '元':'平台总成本:'+this.props.managementCostlList.data.totalPltFee+'  '+'九派总成本:'+this.props.managementCostlList.data.jiuPaiFee,
                    glfPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            }
            console.log('list1', this.props.managementCostlList)
            console.log("showButton",this.state.showButton)
        })
        getTXList(1, this.state.txPagination.pageSize, value, this.state.searchItem, (action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            } else if (this.props.managementCostlList.code == 0) {
                this.setState({
                    accountId: value,
                    tabList3: this.props.managementCostlList.data,
                    txIds: this.props.managementCostlList.data.ids,
                    txData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    txMsg: '从账户：' + this.props.managementCostlList.data.bondAccount + '中提出' + this.props.managementCostlList.data.totalPltFee + '元',
                    txPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },

                })
            }
            console.log('list3', this.props.managementCostlList)
        })
        getSXFList(1, this.state.sxfPagination.pageSize, value, this.state.searchItem, (action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            } else if (this.props.managementCostlList.code == 0) {
                this.setState({
                    tabList2: this.props.managementCostlList.data,
                    accountId: value,
                    sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    sxfPagination: {
                        current: this.props.managementCostlList.data.pageNo,
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            }
            console.log('list2', this.props.managementCostlList)
        })

    }
    //render那个下拉单
    contentRender = () => {
        const options = this.state.accountData.map(d => <Option key={d.id}>{`${d.bondName} ${d.account}`}</Option>);
        return <div>
            {/* <Select style={{ width: 140 }} onSelect={value => this.searchState(value)} defaultValue='请选择账户：'> */}
            <Select style={{ minWidth: 210 }} onSelect={value => this.searchState(value)} defaultValue='请选择账户：'>
                {options}
            </Select>
            {
                this.state.accountId ? <Button style={{ marginLeft: 20 }} type="primary" onClick={this.excel}>生成EXCEL</Button> : ''
            }
            {systemSetup[0].bool ?
                <div className="action" style={{ marginTop: 20 }} >
                    <InputGroup compact style={{ display: this.state.accountId && this.state.activeKey == '1' && this.state.glfData.length > 0 ? 'block' : 'none' }} >
                        <Input style={{ width: this.state.glfMsg.length * 14, textAlign: 'center' }} ref='biginning' value={this.state.glfMsg} disabled />
                        <Button style={{ borderRightWidth: 1}} type="primary" disabled={this.state.showButton?'':'disabled'} >
                            <Popconfirm title='确定要操作吗?' onConfirm={() => this.submit()}>
                                <a href="#">确认</a>
                            </Popconfirm>
                        </Button>
                    </InputGroup>
                    <InputGroup compact style={{ display: this.state.accountId && this.state.activeKey == '3' && this.state.txData.length > 0 ? 'block' : 'none' }} >
                        <Input style={{ width: this.state.txMsg.length * 14, textAlign: 'center' }} ref='biginning' value={this.state.txMsg} disabled />
                        <Button style={{ borderRightWidth: 1 }} type="primary" >
                            <Popconfirm title="确定要操作吗?" onConfirm={() => this.submitTx()}>
                                <a href="#">确认</a>
                            </Popconfirm>
                        </Button>
                    </InputGroup>
                </div> : ''}
            {this.state.accountId ? <InputGroup style={{ marginTop: 20 }}>
                <Input type='text' ref='acc' placeholder='交易账户' style={{ width: 160, marginRight: 10 }} />
                <Input type='text' ref='phone' placeholder='手机' style={{ width: 160, marginRight: 10 }} />
                {/* <Input style={{ width: 100,  }} ref='biginning'  placeholder="开始时间" /> */}
                <DatePicker style={{ marginRight: 10 }} onChange={this.chooseDay} ref='start' format={dateFormat} placeholder="开始时间" />
                {/* <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',textAlign:'center' }} placeholder="-" disabled /> */}
                <DatePicker style={{ marginRight: 10 }} onChange={this.chooseDay1} ref='end' format={dateFormat} placeholder="结束时间" />

                <Button style={{ borderRightWidth: 1, verticalAlign: 'top' }} onClick={this.goSearch} type="primary">搜索</Button>
                <Button style={{ marginLeft: 10, verticalAlign: 'top' }} onClick={this.refreshInput}>重置</Button>
            </InputGroup> : ''}
        </div>
    }



    render() {
        // const options = this.state.accountData.map(d => <Option key={d.id}>{d.bondName}</Option>);
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="手续费管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content={this.contentRender()}
                    action=''
                    extraContent=''
                />
                <div id="bodyDiv" className="tableBox">
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="证转银列表" key="1">
                            <div style={{marginBottom:10}}>
                                <Tag type="large">券商佣金总和：{this.state.tabList1.totalBondFee}</Tag>
                                <Tag>印花税总和：{this.state.tabList1.totalStampFee}</Tag>
                                <Tag>过户费总和：{this.state.tabList1.totalTransferFee}</Tag>
                                <Tag>平台成本总和：{this.state.tabList1.totalPltFee}</Tag>
                                <Tag>九派成本总和：{this.state.tabList1.jiuPaiFee}</Tag>
                                <Tag>手续费总和：{this.state.tabList1.totalPoundage}</Tag>
                            </div>
                            <Table columns={this.state.glfColumns} dataSource={this.state.glfData} rowKey={record => record.id}
                                pagination={this.state.glfPagination}
                                // loading={this.state.loading}
                                onChange={this.glfhandleTableChange}
                                bordered />
                        </TabPane>
                        <TabPane tab='银行待转出' key="3">
                            <div style={{marginBottom:10}}>
                                <Tag>券商佣金总和：{this.state.tabList3.totalBondFee}</Tag>
                                <Tag>印花税总和：{this.state.tabList3.totalStampFee}</Tag>
                                <Tag>过户费总和：{this.state.tabList3.totalTransferFee}</Tag>
                                <Tag>平台成本总和：{this.state.tabList3.totalPltFee}</Tag>
                                <Tag>手续费总和：{this.state.tabList3.totalPoundage}</Tag>
                            </div>
                            <Table columns={this.state.txColumns} dataSource={this.state.txData} rowKey={record => record.id}
                                pagination={this.state.txPagination}
                                // loading={this.state.loading}
                                onChange={this.txhandleTableChange}
                                bordered />
                        </TabPane>
                        <TabPane tab='转出历史' key="2">
                            <div style={{marginBottom:10}}>
                                <Tag>券商佣金总和：{this.state.tabList2.totalBondFee}</Tag>
                                <Tag>印花税总和：{this.state.tabList2.totalStampFee}</Tag>
                                <Tag>过户费总和：{this.state.tabList2.totalTransferFee}</Tag>
                                <Tag>平台成本总和：{this.state.tabList2.totalPltFee}</Tag>
                                <Tag>手续费总和：{this.state.tabList2.totalPoundage}</Tag>
                            </div>
                            <Table columns={this.state.sxfColumns} dataSource={this.state.sxfData} rowKey={record => record.id}
                                pagination={this.state.sxfPagination}
                                // loading={this.state.loading}
                                onChange={this.sxfhandleTableChange}
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
    submit = () => {
        tixianList(this.state.glfIds, (action) => {
            this.props.dispatch(action)
        })
        console.log(this.props.managementCostlList)
        if (this.props.managementCostlList.code == 0) {
            this.setState({
                modalvisible: true,
                msg: this.state.glfMsg
            })
            this.searchState(this.state.accountId)
        } else if (this.props.managementCostlList.code > 0) {
            this.setState({
                modalvisible: true,
                msg: this.props.managementCostlList.message
            })
        }
    }
    submitTx = () => {
        txList(this.state.txIds, (action) => {
            this.props.dispatch(action)
        })
        console.log(this.props.managementCostlList)
        if (this.props.managementCostlList.code == 0) {
            this.setState({
                modalvisible: true,
                msg: this.state.txMsg
            })
            this.searchState(this.state.accountId)
        } else if (this.props.managementCostlList.code > 0) {
            this.setState({
                modalvisible: true,
                msg: this.props.managementCostlList.message
            })
        }
    }
    modalOk = () => {
        let item = {
            account: '',
            phone: '',
            startTime: '',
            endTime: '',
        }
        this.refs.start.picker.input.value = null
        this.refs.start.picker.state.value = null
        this.refs.end.picker.input.value = null
        this.refs.end.picker.state.value = null
        this.refs.acc.input.value = ''
        this.refs.phone.input.value = ''
        this.setState({
            modalvisible: false,
            searchItem: item,

        })
        if (this.props.managementCostlList.code == 0) {
            getGLFList(this.state.glfPagination.current, this.state.glfPagination.pageSize, this.state.accountId, item, (action) => {
                this.props.dispatch(action);
                this.setState({
                    glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    glfPagination: {
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
            getTXList(this.state.txPagination.current, this.state.txPagination.pageSize, this.state.accountId, item, (action) => {
                this.props.dispatch(action);
                this.setState({
                    txData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    txPagination: {
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
            getSXFList(this.state.sxfPagination.current, this.state.sxfPagination.pageSize, this.state.accountId, item, (action) => {
                this.props.dispatch(action);
                this.setState({
                    sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    sxfPagination: {
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
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
    chooseDay = (value) => {
        let day = moment(value).format('YYYY-MM-DD')

    }
    chooseDay1 = (value) => {
        let day = moment(value).format('YYYY-MM-DD')

    }
    //重置
    refreshInput = () => {
        this.refs.start.picker.input.value = null
        this.refs.start.picker.state.value = null
        this.refs.end.picker.input.value = null
        this.refs.end.picker.state.value = null
        this.refs.acc.input.value = ''
        this.refs.phone.input.value = ''

        this.setState({
            searchItem: {
                account: '',
                phone: '',
                startTime: '',
                endTime: '',
            }
        }, () => {
            this.searchState(this.state.accountId)
        })


    }
    goSearch = () => {
        this.setState({
            searchItem: {
                account: this.refs.acc.input.value,
                phone: this.refs.phone.input.value,
                startTime: this.refs.start.picker.input.value,
                endTime: this.refs.end.picker.input.value,
            }
        }, () => {
            this.searchState(this.state.accountId)
        })

    }

    excel = ()=>{
        let item = {
            stockAccountId: this.state.accountId,
            startTime: this.state.searchItem.startTime,
            endTime: this.state.searchItem.endTime,
            phone: this.state.searchItem.phone,
            account: this.state.searchItem.account,
            withState: this.state.activeKey == '1' ? 'NEW' : this.state.activeKey == '2' ? 'TOBANK' : 'WITHDRAW'
        }
        console.log(item)
        addExcel(item, (action) => {
            this.props.dispatch(action)
            console.log(this.props.managementCostlList)
            if (this.props.managementCostlList.code == 0) {
                this.openNotificationWithIcon('success', '操作成功，正在为你生成EXCEL！')
                console.log("ok", this.props.managementCostlList)
                this.refresh()
            } else {
                this.openNotificationWithIcon('error', this.props.managementCostlList.message)
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
}
function filterList(store) {
    // console.log(store);
    return {
        managementCostlList: store.serviceCharge_List
    }
}

export default connect(filterList)(ServiceCharge)
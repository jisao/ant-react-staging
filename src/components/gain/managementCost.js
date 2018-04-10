import React from "react";
import { Table, Button, Input, Modal, Icon, Tabs, Select, Popconfirm, } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getPtDepositList, getGLFList, getSXFList, tixianList,zzytixianList } from "../../redux/actions/acGain/acManagementCost";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const InputGroup = Input.Group;

//定义系统设置的资源码
const systemSetup = [
    { name: '手续费管理-确认按钮', bool: false }
]
class ManagementCost extends React.Component {
    state = {
        systemSetupData: [],
        accountData: [],
        defaultValue: '',
        accountId: '',
        modalvisible: false,
        activeKey: '0',
        msg: '',
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '盈利管理',
            }, {
                title: '管理费管理',
            }],
        //====================================
        zzyData: [],
        zzyMsg: '',
        zzyIds: [],
        zzyPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        //========================
        glfData: [],
        glfMsg: '',
        glfIds: [],
        glfPagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        glfColumns: [
            {
                title: "费用",
                dataIndex: "fee"
            },
            {
                title: "用户",
                dataIndex: 'account',
            },
            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{text == 'PAY' ? <div>管理费</div> : text == 'PAY_TRADE' ? <div>结清抵扣</div> : <div>{text}</div>}</div>
            },
            {
                title: "盈利提取状态",
                dataIndex: "withstate",
                render: (text) =>
                    <div>{text == 'NEW' ? <div>已提取</div> : text == 'WITHDRAW' ? <div>已转出</div> : text == 'TOBANK' ?<div>未提取</div>:<div>{text}</div>}</div>
            },
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render: (text) =>
                    <div>{this.formatDate(text)}</div>
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
                title: "用户",
                dataIndex: 'account',
            },
            {
                title: "费用",
                dataIndex: "fee"
            },

            {
                title: "状态",
                dataIndex: "state",
                render: (text) =>
                    <div>{text == 'PAY' ? <div>管理费</div> : text == 'PAY_TRADE' ? <div>结清抵扣</div> : <div>{text}</div>}</div>
            },
            {
                title: "盈利提取状态",
                dataIndex: "withstate",
                render: (text) =>
                <div>{text == 'NEW' ? <div>已提取</div> : text == 'WITHDRAW' ? <div>已转出</div> : text == 'TOBANK' ?<div>未提取</div>:<div>{text}</div>}</div>
            },
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render: (text) =>
                    <div>{this.formatDate(text)}</div>
            }],
    };
     //render那个下拉单
     contentRender = () => {
        const options = this.state.accountData.map(d => <Option key={d.id}>{`${d.bondName} ${d.account}`}</Option>);
        return <div>
            <Select style={{ minWidth: 210 }} onSelect={value => this.searchState(value)} defaultValue='请选择账户：'>
                {options}
            </Select>
        </div>
    }

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

    // searchState = (value) => {
    //     getGLFList(1, this.state.zzyPagination.pageSize, value,'TOBANK', (action) => {
    //         this.props.dispatch(action)
    //         console.log( this.props.managementCostlList.data.result)
    //         if (this.props.managementCostlList.code > 0) {
    //             this.setState({
    //                 modalvisible: true,
    //                 msg: this.props.managementCostlList.message
    //             })
    //             return
    //         }
    //         this.setState({
    //             accountId: value,
    //             zzyIds: this.props.managementCostlList.data.ids,
    //             zzyData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
    //             zzyMsg: '可提取' + this.props.managementCostlList.data.amount + '元',
    //             zzyPagination: {
    //                 total: this.props.managementCostlList.data.total,
    //                 pageSize: this.props.managementCostlList.data.pageSize,
    //             },

    //         })
    //     })
    //     getGLFList(1, this.state.glfPagination.pageSize, value,'NEW', (action) => {
    //         this.props.dispatch(action)
    //         // console.log(this.props)
    //         if (this.props.managementCostlList.code > 0) {
    //             this.setState({
    //                 modalvisible: true,
    //                 msg: this.props.managementCostlList.message
    //             })
    //             return
    //         }
    //         this.setState({
    //             accountId: value,
    //             glfIds: this.props.managementCostlList.data.ids,
    //             glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
    //             glfMsg: '可提取' + this.props.managementCostlList.data.amount + '元',
    //             glfPagination: {
    //                 total: this.props.managementCostlList.data.total,
    //                 pageSize: this.props.managementCostlList.data.pageSize,
    //             },

    //         })
    //     })
    //     getSXFList(1, this.state.sxfPagination.pageSize, value, (action) => {
    //         this.props.dispatch(action)
    //         if (this.props.managementCostlList.code > 0) {
    //             this.setState({
    //                 modalvisible: true,
    //                 msg: this.props.managementCostlList.message
    //             })
    //             return
    //         }
    //         this.setState({
    //             accountId: value,
    //             sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
    //             sxfPagination: {
    //                 total: this.props.managementCostlList.data.total,
    //                 pageSize: this.props.managementCostlList.data.pageSize,
    //             },

    //         })
    //     })


    // };

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
    //zzy换页
    zzyhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getGLFList(pagination.current, pagination.pageSize, this.state.accountId,'TOBANK', (action) => {
                this.props.dispatch(action);
                // console.log(this.props.managementCostlList)
                this.setState({
                    zzyData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    zzyPagination: {
                        total: this.props.managementCostlList.data.total,
                        pageSize: this.props.managementCostlList.data.pageSize,
                    },
                })
            })
        }, 200);

    };
    //glf换页
    glfhandleTableChange = (pagination) => {
        // console.log(pagination)
        setTimeout(() => {
            getGLFList(pagination.current, pagination.pageSize, this.state.accountId,'NEW', (action) => {
                this.props.dispatch(action);
                // console.log(this.props.managementCostlList)
                this.setState({
                    glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    glfPagination: {
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
            getSXFList(pagination.current, pagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);
                // console.log(this.props)
                this.setState({
                    sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                    sxfPagination: {
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
        } else if(key == "2") {
            this.setState({
                activeKey: "2"
            });
        }else if(key == '0'){
            this.setState({
                activeKey: "0"
            });
        }
    }
    //选择不同的账户信息
    searchState = (value) => {
        getGLFList(1, this.state.zzyPagination.pageSize, value, 'TOBANK',(action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            }
            console.log('zzy', this.props.managementCostlList)
            this.setState({
                accountId: value,
                zzyIds: this.props.managementCostlList.data.ids,
                zzyData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                zzyMsg: '可提取' + this.props.managementCostlList.data.amount + '元',
                zzyPagination: {
                    total: this.props.managementCostlList.data.total,
                    pageSize: this.props.managementCostlList.data.pageSize,
                },

            })
        })
        getGLFList(1, this.state.glfPagination.pageSize, value, 'NEW',(action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            }
            console.log('glf', this.props.managementCostlList)
            this.setState({
                accountId: value,
                glfIds: this.props.managementCostlList.data.ids,
                glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                glfMsg: '可提取' + this.props.managementCostlList.data.amount + '元',
                glfPagination: {
                    total: this.props.managementCostlList.data.total,
                    pageSize: this.props.managementCostlList.data.pageSize,
                },

            })
        })
        getSXFList(1, this.state.sxfPagination.pageSize, value, (action) => {
            this.props.dispatch(action)
            if (this.props.managementCostlList.code > 0) {
                this.setState({
                    modalvisible: true,
                    msg: this.props.managementCostlList.message
                })
                return
            }
            console.log('sxf', this.props.managementCostlList)
            this.setState({
                accountId: value,
                sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : [],
                sxfPagination: {
                    total: this.props.managementCostlList.data.total,
                    pageSize: this.props.managementCostlList.data.pageSize,
                },

            })
        })

    }

    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="管理费管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content={this.contentRender()}
                    extraContent={<div className="extraContent">
                        {systemSetup[0].bool ?
                            <div className="action" style={{ display: this.state.activeKey == '0' && this.state.zzyData.length > 0 ? 'block' : 'none' }} >
                                <InputGroup compact  >
                                    <Input style={{ width: this.state.zzyMsg.length * 18, textAlign: 'center' }} ref='biginning1' value={this.state.zzyMsg} disabled />
                                    <Button style={{ borderRightWidth: 1 }} type="primary">
                                        <Popconfirm title="确定要操作吗?" onConfirm={() => this.submitzzy()}>
                                            <a href="#">确认</a>
                                        </Popconfirm>
                                    </Button>
                                </InputGroup>
                            </div> : ''}
                        {systemSetup[0].bool ?<div className="action" style={{ display: this.state.activeKey == '1' && this.state.glfData.length > 0 ? 'block' : 'none' }} >
                                <InputGroup compact  >
                                    <Input style={{ width: this.state.glfMsg.length * 18, textAlign: 'center' }} ref='biginning' value={this.state.glfMsg} disabled />
                                    <Button style={{ borderRightWidth: 1 }} type="primary">
                                        <Popconfirm title="确定要操作吗?" onConfirm={() => this.submit()}>
                                            <a href="#">确认</a>
                                        </Popconfirm>
                                    </Button>
                                </InputGroup>
                        </div> : ''}
                    </div>}
                />
                <div id="bodyDiv" className="tableBox">
                    <Tabs defaultActiveKey="0" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                    <TabPane tab="证转银" key="0">
                            <Table columns={this.state.glfColumns} dataSource={this.state.zzyData} rowKey={record => record.id}
                                pagination={this.state.zzyPagination}
                                // loading={this.state.loading}
                                onChange={this.zzyhandleTableChange}
                                bordered />
                        </TabPane>
                        <TabPane tab="银行待转出" key="1">
                            <Table columns={this.state.glfColumns} dataSource={this.state.glfData} rowKey={record => record.id}
                                pagination={this.state.glfPagination}
                                // loading={this.state.loading}
                                onChange={this.glfhandleTableChange}
                                bordered />
                        </TabPane>
                        <TabPane tab='转出历史' key="2">
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
    submitzzy = () => {
        zzytixianList(this.state.zzyIds, (action) => {
            this.props.dispatch(action)
        })
        console.log(this.props.managementCostlList)
        if (this.props.managementCostlList.code == 0) {
            this.setState({
                modalvisible: true,
                msg: '信息处理成功'
            })
            this.searchState(this.state.accountId)
        } else if (this.props.managementCostlList.code > 0) {
            this.setState({
                modalvisible: true,
                msg: this.props.managementCostlList.message
            })
        }
    }
    submit = () => {
        tixianList(this.state.glfIds, (action) => {
            this.props.dispatch(action)
        })
        console.log(this.props.managementCostlList)
        if (this.props.managementCostlList.code == 0) {
            this.setState({
                modalvisible: true,
                msg: '信息处理成功'
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
        this.setState({
            modalvisible: false
        })
        if (this.props.managementCostlList.code == 0) {
            getGLFList(this.state.zzyPagination.current, this.state.zzyPagination.pageSize, this.state.accountId,'TOBANK', (action) => {
                this.props.dispatch(action);
                this.setState({
                    zzyData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : []
                })
            })
            getGLFList(this.state.glfPagination.current, this.state.glfPagination.pageSize, this.state.accountId,'NEW', (action) => {
                this.props.dispatch(action);
                this.setState({
                    glfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : []
                })
            })
            getSXFList(this.state.sxfPagination.current, this.state.sxfPagination.pageSize, this.state.accountId, (action) => {
                this.props.dispatch(action);

                this.setState({
                    sxfData: this.props.managementCostlList.data.result ? this.props.managementCostlList.data.result : []
                })
                this.refresh()
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
        managementCostlList: store.managementCostl_List
    }
}

export default connect(filterList)(ManagementCost)
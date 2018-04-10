import React, { Children } from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getFundingDeploy, addFundingDeploy, removeFundingDeploy, changeFundingDeploy } from "../../redux/actions/acFunding/acFundingDeploy";

require("./fundingDeploy.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

//设置操作选项的资源
const deployed = "系统-配资-操作按钮"

class fundingDeploy extends React.Component {

    state = {
        //设置操作选项的资源的bool
        deployedBool: false,
        //页头的最左上方小导航
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '系统设置',
            }, {
                title: '配资配置',
            }],
        columns: [
            {
                title: "倍数",
                dataIndex: "multiple",

            },
            {
                title: "单位",
                dataIndex: "type",
                render: (text) =>
                    <div>{
                        text == "DAY" ? <div>天</div> : (text == "MONTH" ? <div>月</div> : text == "NEW" ? <div>新手体验</div> : '')
                    }</div>
            },
            {
                title: "持仓时长",
                dataIndex: "holdTime",
            },
            {
                title: "警戒线",
                dataIndex: 'dangerRate',
            },
            {
                title: "止损线",
                dataIndex: "stopRate",

            },
            {
                title: "管理费率",
                dataIndex: 'feeRate',
            },

            {
                title: "最小值",
                dataIndex: "minInput"
            },
            {
                title: "最大值",
                dataIndex: "maxInput"
            },
            {
                title: "创业板持仓",
                dataIndex: "gePercent"
            },
            {
                title: "主板持仓",
                dataIndex: "mbPercent"
            },
            {
                title: "单票持仓",
                dataIndex: "signalPercent"
            },
            {
                title: "最少预存",
                dataIndex: "minPrestore",

            },
            {
                title: "最多预存",
                dataIndex: "maxPrestore",

            },
            {
                title: "操作",
                key: "action",
                render: (record) =>
                    <div>
                        {this.state.deployedBool ?
                            <div>
                                <a href="javascript:;" onClick={() => this.change(record)}>修改</a>
                                丨
                            <Popconfirm title="确定要删除吗?" onConfirm={() => this.remove(record)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>

                            </div> : ''}
                    </div>
            }],

        itemList: [],
        loading: false,
        loadingReset: false,
        loadingSubmit: false,
        loadingCancel: false,
        getSubmit: false,
        modalvisible: false,
        activeKey: "1",
        //下拉框选中的value
        selectValue: 'DAY',
        //下拉框的初始value
        defaultValue: 'DAY',
        tab2Name: '新增',
        //修改时传的id
        changeId: '',
        msg: '',
        //设置权限Data
        userPermissData: []
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="配资配置"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action=
                    {<div className="action">
                        <div>
                            {/* <Button onClick={this.tabsOnChange} style={{ marginRight: '5px' }}>添加</Button> */}
                        </div>
                    </div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}

                />
                <div id="bodyDiv1" className="tableBox">
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="配置信息" key="1">
                            <Table columns={this.state.columns} dataSource={this.state.itemList}
                                rowKey={record => record.id}
                                loading={this.state.loading}
                                bordered
                            />
                        </TabPane>
                        <TabPane tab={this.state.tab2Name} key="2" className="inputDiv">
                            <p><label>警戒线(因子)：</label><Input ref='dangerRate' size="large" type="text" /></p>
                            <p><label>止损线(因子)：</label><Input ref='stopRate' size="large" type="text" /></p>
                            <p><label>管理费费率：</label><Input ref='feeRate' size="large" type="text" /></p>
                            <p><label>持仓时间(天)：</label><Input ref='holdTime' size="large" type="text" /></p>
                            <p><label>最小值：</label><Input ref='minInput' size="large" type="text" /></p>
                            <p><label>最大值：</label><Input ref='maxInput' size="large" type="text" /></p>
                            <p><label>创业板持仓(%)：</label><Input ref='gePercent' size="large" type="text" /></p>
                            <p><label>主板持仓(%)：</label><Input ref='mbPercent' size="large" type="text" /></p>
                            <p><label>单票持仓(%)：</label><Input ref='signalPercent' size="large" type="text" /></p>
                            <p><label>最多预存管理费：</label><Input ref='maxPrestore' size="large" type="text" /></p>
                            <p><label>最少预存管理费：</label><Input ref='minPrestore' size="large" type="text" /></p>
                            <p><label>倍数：</label><Input ref='multiple' size="large" type="text" disabled={this.state.tab2Name == '新增' ? false : true} /></p>
                            <div style={{ 'width': '80%', 'marginLeft': '22%', 'padding': '2%' }}>
                                <label style={{ 'marginRight': '20px' }}>单位选择：</label>
                                <Select value={this.state.defaultValue} style={{ width: 120 }} onChange={this.selectChange} disabled={this.state.tab2Name == '新增' ? false : true}>
                                    <Option value="DAY">日</Option>
                                    <Option value="MONTH">月</Option>
                                    <Option value="NEW">新手体验</Option>
                                </Select>
                            </div>
                            <p>
                                <Button key="submit" type="primary" size="large" loading={this.state.loadingSubmit} onClick={this.handleOk}>确定</Button>
                                <Button key="back" size="large" onClick={this.handleCancel} loading={this.state.loadingCancel}>取消</Button>
                            </p>
                            <Modal
                                title="警告"
                                visible={this.state.modalvisible}
                                onOk={this.modalOk}
                                onCancel={this.modalOk}
                            >
                                <p>{this.state.msg}</p>

                            </Modal>
                        </TabPane>
                    </Tabs>

                </div >
            </div>
        )

    }
    //警告框
    modalOk = () => {
        this.setState({
            modalvisible: false
        })
    }
    onTabChange = (key) => {
        console.log(key)
    }
    //刷新
    refresh = () => {
        this.setState({ loading: true });
        getFundingDeploy((action) => {
            this.props.dispatch(action)
            this.setState({
                loading: false,
                itemList: this.props.fundingDeployList.data.result
            })
            console.log(this.state.itemList)
        })
    }

    componentWillMount() {
        this.setState({
            userPermissData: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
        })
    }
    //页面初加载后
    componentDidMount() {
        let arr = this.state.userPermissData
        if (arr.indexOf(deployed) != -1) {
            this.setState({
                deployedBool: true
            })
        }
        this.refresh()
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
    //删除一条信息
    remove = (record) => {
        removeFundingDeploy(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })
    }
    //点击修改
    change = (record) => {
        setTimeout(() => {
            this.setState({
                activeKey: "2",
                tab2Name: '修改',
                defaultValue: record.type,
                changeId: record.id,
                selectValue: record.type,
            })
            this.refs.dangerRate.input.value = record.dangerRate
            this.refs.feeRate.input.value = record.feeRate
            this.refs.holdTime.input.value = record.holdTime
            this.refs.minInput.input.value = record.minInput
            this.refs.maxInput.input.value = record.maxInput
            this.refs.gePercent.input.value = record.gePercent
            this.refs.mbPercent.input.value = record.mbPercent
            this.refs.signalPercent.input.value = record.signalPercent
            this.refs.multiple.input.value = record.multiple
            this.refs.maxPrestore.input.value = record.maxPrestore
            this.refs.minPrestore.input.value = record.minPrestore
            this.refs.stopRate.input.value = record.stopRate
            console.log(this.refs);
        }, 500);
    }
    //选中的下拉菜单value
    selectChange = (value) => {
        this.setState({
            selectValue: value,
            defaultValue: value
        })
        console.log(value)
    }
    //点击取消按钮后
    handleCancel = () => {
        this.refs.dangerRate.input.value = ""
        this.refs.feeRate.input.value = ""
        this.refs.holdTime.input.value = ""
        this.refs.minInput.input.value = ""
        this.refs.maxInput.input.value = ""
        this.refs.gePercent.input.value = ""
        this.refs.mbPercent.input.value = ""
        this.refs.signalPercent.input.value = ""
        this.refs.multiple.input.value = ""
        this.refs.maxPrestore.input.value = ""
        this.refs.minPrestore.input.value = ""
        this.refs.stopRate.input.value = ""
        this.setState({
            tab2Name: '新增',
            activeKey: '1',
            defaultValue: "DAY"
        })
        this.refresh()
    }
    //当点击确定按钮后
    handleOk = () => {
        let flag = false
        let item = {
            dangerRate: this.refs.dangerRate.input.value,
            feeRate: this.refs.feeRate.input.value,
            holdTime: this.refs.holdTime.input.value,
            minInput: this.refs.minInput.input.value,
            maxInput: this.refs.maxInput.input.value,
            gePercent: this.refs.gePercent.input.value,
            mbPercent: this.refs.mbPercent.input.value,
            signalPercent: this.refs.signalPercent.input.value,
            multiple: this.refs.multiple.input.value,
            maxPrestore: this.refs.maxPrestore.input.value,
            minPrestore: this.refs.minPrestore.input.value,
            stopRate: this.refs.stopRate.input.value,
            type: this.state.selectValue
        }
        //设定了一个flag，用来保证每个input都有值
        for (let key in item) {
            if (!item[key]) {
                console.log(111)
                flag = true
            }
        }
        if (flag) {
            this.setState({
                modalvisible: true,
                msg: '所有输入框为必填项'
            })
        } else {
            // 表示现在是在新增信息时的操作
            if (this.state.tab2Name == "新增") {
                addFundingDeploy(item, (action) => {
                    this.props.dispatch(action)
                    console.log(this.props.fundingDeployList)
                    if (this.props.fundingDeployList.code == 0) {
                        this.setState({
                            activeKey: '1'
                        })
                        this.refresh()
                    } else if (this.props.fundingDeployList.code > 0) {
                        this.setState({
                            modalvisible: true,
                            msg: this.props.fundingDeployList.message
                        })
                    }

                })
                //表示在修改信息时的操作
            } else if (this.state.tab2Name == '修改') {
                item.id = this.state.changeId
                changeFundingDeploy(item, (action) => {
                    this.props.dispatch(action)
                    if (this.props.fundingDeployList.code == 0) {
                        this.setState({
                            activeKey: '1'
                        })
                        this.refresh()
                    } else if (this.props.fundingDeployList.code > 0) {
                        this.setState({
                            modalvisible: true,
                            msg: this.props.fundingDeployList.message
                        })
                    }
                })
            }
        }
        this.handleCancel()
    }

}

function filterfundingDeploy(store) {
    console.log(store);
    return {
        fundingDeployList: store.fundingDeploy
    }
}

export default connect(filterfundingDeploy)(fundingDeploy)

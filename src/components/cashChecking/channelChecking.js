import React from "react";
import { Table, Button, Input, Select, notification, DatePicker } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import moment from 'moment';
import { getChannelCheckingList, searchChannelCheckingList, comfireList } from "../../redux/actions/acCashChecking/acChannelChecking";

require("./channelChecking.less")

const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class ChannelChecking extends React.Component {
    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '资金对账',
            }, {
                title: '渠道对账',
            }],
        columns: [
            {
                title: "订单号",
                dataIndex: "orderId"
            },
            {
                title: "订单种类",
                dataIndex: "orderType",
                render: (record) =>
                    <div>{
                        record == 'ALLOCATION' ? "配资" : `${record}`
                    }</div>
            },
            {
                title: "订单状态",
                dataIndex: "state",
                render: (record) =>
                    <div>{
                        record == 'COMFIRE' ? "已对帐" : '待对账'
                    }</div>
            },
            {
                title: "渠道",
                dataIndex: "channel",
                render: (record) =>
                    <div>{
                        record == 'JIUPAI' ? "九派支付" : (record == 'RECEIPT' ? '银行转账' : '')
                    }</div>
            },
            {
                title: "金额",
                dataIndex: 'amount',
            },
            {
                title: "对账人",
                dataIndex: "comfireAdmin"
            },
            {
                title: "对账时间",
                dataIndex: "comfireTime",
                render: (item, record) => this.formatDate(item)
            },
            {
                title: "创建时间",
                dataIndex: "gmtCreate",
                render: (item, record) => this.formatDate(item)
            },
            {
                title: "操作",
                key: "action",
                render: (record) =>
                    <div>{
                        record.state == 'COMFIRE' ? '' : <a href="javascript:;" onClick={() => this.comfire(record)}>确认</a>
                    }</div>
            }],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        data: [],
        searchState: ' ',
        start: ' ',
        end: ' ',
        loading: false,
    };

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
    //换页
    handleTableChange = (pagination) => {
        setTimeout(() => {
            this.setState({ loading: true })
            this.setState({
                pagination: {
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                }
            }, () => {
                //针对的是 全部 的分页条件
                if (this.state.searchState == ' ' && this.state.start == ' ' && this.state.end == ' ') {
                    getChannelCheckingList(this.state.pagination.current, this.state.pagination.pageSize, (action) => {
                        this.props.dispatch(action)
                        this.setState({
                            data: this.props.channelCheckingList.data.result,
                            pagination: {
                                total: this.props.channelCheckingList.data.total
                            }
                        })
                    })
                    //针对的是有搜索条件的分页
                } else {
                    let item = {
                        end: this.state.end,
                        start: this.state.start,
                        state: this.state.searchState,
                    }
                    searchChannelCheckingList(this.state.pagination.current, this.state.pagination.pageSize, item, (action) => {
                        this.props.dispatch(action)
                        this.setState({
                            data: this.props.channelCheckingList.data.result,
                            pagination: {
                                total: this.props.channelCheckingList.data.total,
                                current: this.props.channelCheckingList.data.pageNo,
                                pageSize: this.props.channelCheckingList.data.pageSize,
                            }
                        })
                    })
                }
            })
        }, 500);

        setTimeout(() => {
            this.setState({ loading: false })
        }, 500);
    };
    //刷新
    refresh = () => {
        this.setState({ loading: true })
        getChannelCheckingList(this.state.pagination.current, this.state.pagination.pageSize, (action) => {
            this.props.dispatch(action)
            // console.log(this.props.channelCheckingList.data)
            this.setState({
                data: this.props.channelCheckingList.data.result,
                pagination: {
                    total: this.props.channelCheckingList.data.total,
                    current: this.props.channelCheckingList.data.pageNo,
                    pageSize: this.props.channelCheckingList.data.pageSize
                }
            }, () => { this.setState({ loading: false }) })
            // console.log(this.state.pagination)
        })

    };

    componentDidMount() {
        this.refresh()

    }
    render() {

        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="渠道对账"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content={
                        <InputGroup compact>
                            <Select defaultValue=" " onSelect={value => this.searchState(value)}>
                                <Option value=" ">全部</Option>
                                <Option value="WAIT">待对账</Option>
                                <Option value="COMFIRE">已对账</Option>
                            </Select>
                            {/* <Input style={{ width: 100,  }} ref='biginning'  placeholder="开始时间" /> */}
                            <DatePicker onChange={this.chooseDay} format={dateFormat} placeholder="开始时间" />
                            {/* <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',textAlign:'center' }} placeholder="-" disabled /> */}
                            <DatePicker onChange={this.chooseDay1} format={dateFormat} placeholder="结束时间" />
                            <Button style={{ borderRightWidth: 1 }} onClick={this.goSearch} type="primary">搜索</Button>
                            <Button style={{ marginLeft: 10 }} onClick={this.refreshInput}>重置</Button>
                        </InputGroup>
                    }
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                />
                <div className="tableBox">

                    <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id}
                        // rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        bordered
                    />

                </div>
            </div>
        )
    }
    //选择不同的搜索条件
    searchState = (value) => {
        // console.log(value)
        this.setState({
            searchState: value
        })

    }
    chooseDay = (value) => {
        let day = moment(value).format('YYYYMMDD')
        this.setState({
            start: day
        })
    }
    chooseDay1 = (value) => {
        let day = moment(value).format('YYYYMMDD')
        this.setState({
            end: day
        })
    }
    //进行搜索
    goSearch = () => {
        let item = {
            start: this.state.start,
            end: this.state.end,
            state: this.state.searchState
        }
        if (!item.start || !item.end) {
            notification.open({
                message: '错误提示',
                description: '输入框不能为空',
            });
            return;
        }
        searchChannelCheckingList(1, 10, item, (action) => {
            this.props.dispatch(action)
            this.setState({
                data: this.props.channelCheckingList.data.result,
                pagination: {
                    total: this.props.channelCheckingList.data.total,
                    current: this.props.channelCheckingList.data.pageNo,
                    pageSize: this.props.channelCheckingList.data.pageSize
                }
            })
        })
    }
    //重置按钮点下 刷新页面
    refreshInput = () => {
        this.setState({
            end: ' ',
            start: ' ',
            searchState: ' ',
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            }
        }, () => {
            // console.log(this.state.pagination)
            this.refresh()
        })
    }
    //确认按钮
    comfire = (record) => {
        comfireList(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })
    }
}


function filterUsersList(store) {
    // console.log(store);
    return {
        channelCheckingList: store.channelCheckingManage
    }
}

export default connect(filterUsersList)(ChannelChecking)
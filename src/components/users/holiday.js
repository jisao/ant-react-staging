import React from "react";
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, DatePicker, notification,Popconfirm } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getholidayList, changeHoliday, removeHoliday, addHoliday } from "../../redux/actions/acUsers/acHoliday";

require("./holiday.less")

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class holiday extends React.Component {

    state = {
        loading: false,
        show: false,
        datePickerDisabled: true,
        day: '',
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
                title: '系统设置',
        }, {
            title: '假日管理',
        }],
        columns: [{
            title: "日期",
            dataIndex: "day",
            render: (text, record) =>
                <div >
                    <DatePicker disabled={record.datePickerDisabled ? false : true} onOpenChange={()=>{this.onOpenChange(record.id)} } className="datePicker" onOk={()=>{this.changeDay(record)} } defaultValue={moment(text, dateFormat)} format={dateFormat} showTime allowClear />
                </div>
        }, {
            title: "创建人",
            dataIndex: 'creater',
        }, {
            title: "创建时间",
            dataIndex: "gmtCreate"
        }, {
            title: "操作",
            key: "action",
            render: (text,record) => <div>
                <a href="javascript:;" onClick={() => this.changeUser(record)}>修改</a>
                丨
                <Popconfirm title="确定删除？" onConfirm={() => this.removeholiday(record)}>
                    <a href="javascript:;">删除</a>
                </Popconfirm>
                丨
                <a href="javascript:;" onClick={() => this.cancelChangeUser(record)}>取消</a>
            </div>
        },],

        itemList: [],

    }
    //翻页
    handleTableChange = (pagination) => {
        this.setState({
            pagination
        });
        this.refresh()
    }

    //刷新
    refresh = () => {

        let {current, pageSize} = this.state.pagination;

        this.setState({ loading: true });
        //初始化页面
        getholidayList(current, pageSize, (action) => {
            this.props.dispatch(action)
            this.state.pagination.total = action.data.total
            setTimeout(() => {
                this.setState({
                    loading: false,
                    itemList: this.props.holidayList,
                    pagination:this.state.pagination
                });
                console.log(this.state.pagination);
            }, 300);
        })
    };
    // 初加载
    componentDidMount() {
        this.refresh();
    }

    render() {

        let { itemList, breadcrumbList } = this.state

        let { holidayList, dispatch } = this.props

        return (
            <div>
                <PageHeader
                    title="假日管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action={
                        <div className="action">
                            <DatePicker onOk={this.chooseDay} defaultValue={moment('20150101', dateFormat)} format={dateFormat} showTime />
                        </div>}
                    extraContent={<div className="extraContent">添加新的日期</div>}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox">
                    <Table columns={this.state.columns} dataSource={itemList} rowKey={record => record.id}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        // onChange={this.handleTableChange}
                        bordered
                    />
                    <Modal visible={this.state.show}
                        title="添加假日"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确定</Button>,
                            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        ]}>
                        <DatePicker onOk={this.chooseDay} defaultValue={moment('20150101', dateFormat)} format={dateFormat} showTime />
                    </Modal>
                </div>
            </div>
        )
    }
    //选定日期
    chooseDay = (value) => {
        // console.log(moment(value).format('YYYYMMDD'))
        let day = moment(value).format('YYYYMMDD')
        addHoliday(day, (action) => {
            this.props.dispatch(action)
            if (this.props.dispatch(action).data.data.code > 0) {
                notification.open({
                    message: '添加出错',
                    description: this.props.dispatch(action).data.data.message,
                });
            } else {
                this.handleCancel()
                this.refresh()
            }
        })
    }
    //修改日期
    changeDay=(...reset)=>{
        console.log(reset);
    }
    //当日期框打开或者关闭的时候
    onOpenChange=(id)=>{
        console.log(id);
    }

    //取消弹窗
    handleCancel = () => {
        this.setState({
            show: false
        })
    }
    //展开弹窗
    handleAdd = () => {
        this.setState({
            show: true
        })
    }
    //删除假日
    removeholiday = (record) => {
        removeHoliday(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })
    }

    //点击修改用户
    changeUser = (record) => {
        for (let item of this.state.itemList) {
            if (item.id == record.id) {
                item.datePickerDisabled = true;
            } else {
                item.datePickerDisabled = false;
            }
        }
        this.setState({
            itemList: this.state.itemList
        })
    }

    //点击取消修改
    cancelChangeUser(record) {
        for (let item of this.state.itemList) {
            item.datePickerDisabled = false;
        }
        this.setState({
            itemList: this.state.itemList
        })
    }
}

function filterHolidayList(store) {
    return {
        holidayList: store.holidayManage.result
    }
}
export default connect(filterHolidayList)(holiday)
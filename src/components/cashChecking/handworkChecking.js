import React from "react";
import { Table, Button, Input, Select, notification, DatePicker } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import moment from 'moment';

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

class HandworkChecking extends React.Component {
    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '资金对账',
            }, {
                title: '手工对账',
            }],
        columns: [
            //     "id": 2,
            // "adminer": "开发测试",
            // "checkDay": "20180125",
            // "gmtCreate": 1517037175000
            {
                title: "ID",
                dataIndex: "id"
            },
            {
                title: "对账者",
                dataIndex: "adminer",
            },
            {
                title: "创建日期",
                dataIndex: "gmtCreate",
                render: (item) => <span>{this.formatDate(item)}</span>
            },
            {
                title: "对账日期",
                dataIndex: "checkDay",
                render: (item) => <span>{this.formatDate(item)}</span>
            }],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        itemlist: [],
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

    componentDidMount() {
        this.initPage()
    }

    render() {

        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="手工对账"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    action={<div className="action">
                        <DatePicker
                            showTime
                            format="YYYYMMDD HH:mm"
                            placeholder="选择日期"
                            onChange={this.onChange}
                            onOk={this.onOk}
                        />
                    </div>}
                    extraContent={<div className="extraContent"></div>}
                />
                <div className="tableBox">

                    <Table columns={this.state.columns} dataSource={this.state.itemlist} rowKey={record => record.id}
                        // pagination={this.state.pagination}
                        loading={this.state.loading}
                        // onChange={this.handleTableChange}
                        bordered
                    />

                </div>
            </div>
        )
    }

    //初始化页面
    initPage = async () => {
        this.setState({
            loading: true
        })
        let obj = await axios({
            method: "POST",
            url: '/check/manual/all',
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
        })
        console.log(obj.data);
        if (obj.data.code == 0) {
            this.setState({
                itemlist: obj.data.data.result,
                loading: false
            })
        } else {
            this.openNotificationWithIcon('error',obj.data.message)
            this.setState({
                loading: false
            })
        }
    }

    onChange = async (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk = async(value) => {
        console.log('onOk: ', value);
        this.setState({
            loading:true,
        })
        let day = moment(value).format('YYYYMMDD HH:mm')
        console.log(day);
        let obj = await axios({
            method: "POST",
            url: 'check/manual/comfire',
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            },
            params:{
                day,
            }
        })
        console.log(obj.data);
        if (obj.data.code == 0) {
            this.initPage()
            this.openNotificationWithIcon('success','上传对账日期成功')
            this.setState({
                loading:false,
            })
        } else {
           this.openNotificationWithIcon('error',obj.data.message)
            this.setState({
                loading:false,
            })
        }
    }

    //提醒框公用函数
    openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
        });
    };
}

export default connect()(HandworkChecking)
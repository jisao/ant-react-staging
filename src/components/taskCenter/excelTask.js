import React, { Children } from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge, } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { getExcelTaskList } from "../../redux/actions/acTaskCenter/acExcelTask";
class ExcelTask extends React.Component {
    state = {
        data: [],
        loading: false,
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '任务中心',
            }, {
                title: 'Excel任务',
            }],
        columns: [
            {
                title: '文件',
                dataIndex: 'fileName',
            },
            {
                title: '导出条件',
                dataIndex: 'parameter',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (text) =>
                    <div>{
                        text == 'NEW' ? <div>生成中</div> : text == 'DOWN' ? <div>可下载</div> : text == 'FAIL' ? <div>失败</div> : <div>{text}</div>
                    }</div>
            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                render: (text) =>
                    <div>{
                        this.formatDate(text)
                    }</div>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    record.state == 'DOWN' ? <div>
                        <Popconfirm title='确定要操作吗?' onConfirm={() => this.submit(record.path)}>
                            <a href="#">下载</a>
                        </Popconfirm>
                    </div> : ''
            },
        ],
    }


    render() {
        return (
            <div>
                <PageHeader
                    title="Excel任务"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action=''
                    extraContent={<div className="extraContent"></div>}

                />
                <div className="tableBox">
                    <Table columns={this.state.columns} dataSource={this.state.data}
                        rowKey={record => record.id}
                        loading={this.state.loading}
                        bordered
                    />
                </div >
            </div>
        )

    }


    //刷新
    refresh = () => {
        getExcelTaskList((action) => {
            this.props.dispatch(action)
            if (this.props.excelTaskList.code == 0) {
                this.setState({
                    data: this.props.excelTaskList.data.result
                })
            }
        })
    }


    //页面初加载后
    componentDidMount() {
        this.refresh()
    }

    submit = (path) => {
        window.open(path);
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

function filterfundingDeploy(store) {
    return {
        excelTaskList: store.excelTask
    }
}

export default connect(filterfundingDeploy)(ExcelTask)

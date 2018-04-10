import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getBrokerList } from "../../redux/actions/acSecurity/acBrokerList";

require("./brokerList.less")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

class brokerList extends React.Component {

    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '证券管理',
            }, {
                title: '券商信息',
            }],

        columns: [{
            title: "券商",
            dataIndex: "name"
        }, {
            title: "创建时间",
            dataIndex: "gmtCreate"
        }, {
            title: "更新时间",
            dataIndex: "gmtModified"
        }, {
            title: "状态",
            dataIndex: "state",
            render: (text) =>
                <div>{
                    text == "NORMAL" ? <Badge status="success" text={'正常'} /> : text == "ABNORMAL" ? <Badge status="error" text={'异常'} /> : <Badge status="error" text={text} />
                }

                </div>
        },
        ],
        itemList: [],
        loading: false,
    }

    render() {
        return (
            <div>
                <PageHeader
                    title="券商信息"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox">
                    <Table columns={this.state.columns} dataSource={this.state.itemList} rowKey={record => record.id}
                        loading={this.state.loading}
                        bordered
                    />
                </div >
            </div>
        )

    }
    onTabChange = (key) => {
        console.log(key)
    }
    refresh = () => {
        this.setState({ loading: true });
        getBrokerList((action) => {
            this.props.dispatch(action)
            console.log(this.props.brokerlist)
            this.setState({
                loading: false,
                itemList: this.props.brokerlist.data.result
            })
            console.log(this.state.itemList)
        })
    }
    componentDidMount() {
        this.refresh()
        console.log(this.state.itemList)
    }
}

function filterbrokerlist(store) {
    console.log(store);
    return {
        brokerlist: store.brokerList
    }
}

export default connect(filterbrokerlist)(brokerList)

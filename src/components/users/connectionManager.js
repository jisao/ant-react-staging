import React, { Children } from "react";
import { connect } from 'react-redux'
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm, Badge } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getConnectionManager } from "../../redux/actions/acFunding/acConnectionManager";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

class connectionManager extends React.Component {

    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '系统设置',
            }, {
                title: '连接管理',
            }],
        columns: [{
            title: "名称",
            dataIndex: 'name',
        }, {
                title: "账号",
                dataIndex: 'account',
            },{
            title: "客户ID",
                dataIndex: "clientId"
        }, {
                title: "ip地址",
                dataIndex: "ip"
        }, {
            title: "数据现状",
                dataIndex: "dataStatus",
                render: (text) =>
                <div>{
                    text ?
                            (text == "NORMAL"? <Badge status="success" text="正常" /> : <Badge status="error" text="异常" />)
                     :''
                }
                </div>
        }, {
            title: "登陆现状",
                dataIndex: "loginStatus",
                render: (text) =>
                    <div>{
                        text ?
                            (text == "NORMAL" ? <Badge status="success" text="正常" /> : <Badge status="error" text="异常" />)
                            : ''
                    }
                    </div>
        }, {
                title: "端口",
                dataIndex: "port"
        }, {
            title: "服务器",
                dataIndex: "server"
            }, {
                title: "上海股东号",
                dataIndex: "shShareNum"
            }, {
                title: "深圳股东号",
                dataIndex: "szShareNum"
            }, {
                title: "yyb",
                dataIndex: "yyb",
           
        }],
      
        itemList: [],
        loading: false,
    }
    

    render() {
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="连接管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox">
                    
                    {this.state.itemList && this.state.itemList.length
                        ? <Table defaultExpandAllRows={true}  columns={this.state.columns} dataSource={this.state.itemList}
                            rowKey={record => record.account ? record.account : record.name}
                            loading={this.state.loading}
                            bordered
                        />
                        : '暂无数据'}
                </div >
            </div>
        )

    }
    onTabChange = (key) => {
        console.log(key)
    }
    refresh = () => {
        this.setState({ loading: true });
        getConnectionManager((action) => {
            this.props.dispatch(action)
            this.setState({
                loading: false,
                itemList: this.props.connectionManagerList.data.result
            })
            console.log(this.state.itemList)
            let arr = this.state.itemList
            for(let value of arr){
                // let children = value.connects
                value.children = value.connects
            }
            
            this.setState({
                itemList:arr
            })
            console.log(this.state.itemList, 123)
        })
    }
    componentDidMount() {
        this.refresh()
    }
}

function filterconnectionManager(store) {
    console.log(store);
    return {
        connectionManagerList: store.connectionManager
    }
}

export default connect(filterconnectionManager)(connectionManager)

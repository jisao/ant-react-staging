//待审核模块
import React from 'react'
import { Table, Progress, Modal } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

//引入action 方法
import { getCheckPendingList } from '../../../redux/actions/acDailiProfit/acCheckPending'
import { getCheckPendingDetails } from '../../../redux/actions/acDailiProfit/acCheckPendingDetails'


class checkPending extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 10
        },
        loading: false,
        loadingModal: false,
        visible: false,
        itemList: [],
        url: "/managefee/auditList",//请求的接口
        curTableType: "待审核详情",//当前table的类型
        curCheckState: "managefee-checkPending",//跳转到详情页面需要存的详情类型
        columns: [{
            title: '订单号',
            dataIndex: 'orderId',
            key: 'orderId',
        },{
            title: '用户',
            dataIndex: 'mobile',
            key: 'mobile',
        }, {
            title: '支付时间',
            dataIndex: 'gmtCreate',
            key: 'gmtCreate',
            render: (item, record) => this.formatDate(item)
        }, {
            title: '开始时间',
            dataIndex: 'gmtModified',
            key: 'gmtModified',
            render: (item, record) => this.formatDate(item)
        }, {
            title: '总额',
            dataIndex: 'amount',
            key: 'amount'
        }, {
            title: '审核进度',
            dataIndex: 'stepText',
            key: 'stepText'
        }, {
            title: '操作',
            key: 'action',
            render: (item, record) => <a href="javascript:;" onClick={() => this.linkDetails(record)}>{this.state.curTableType}</a>,
        }],

        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
            title: '管理费审核',
        }],

    };
    handleTableChange = (pagination) => {
        this.state.pagination.current = pagination.current
        this.state.pagination.total = pagination.total
        this.setState({
            pagination: this.state.pagination
        });
        this.refresh()
    }
    refresh = (key) => {
        this.setState({ loading: true });
        //初始化页面
        console.log(this.state.pagination.current, this.state.pagination.pageSize, this.state.url);
        getCheckPendingList(this.state.pagination.current, this.state.pagination.pageSize, this.state.url, (action) => {
            this.props.dispatch(action);
            console.log(action);
            console.log(this.props.checkPendingList);
            if (this.props.checkPendingList.code != 0) {
                Modal.error({
                    title: '提示框',
                    content: `${this.props.checkPendingList.message}`,
                });
            }
            if (this.props.checkPendingList.code == 0) {
                this.state.pagination.total = this.props.checkPendingList.data.total
                this.setState({
                    itemList: this.props.checkPendingList.data.result,
                    pagination: this.state.pagination,
                    curTableType: key ? key : this.state.curTableType,
                })
            }
        })
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000)

    }
    componentDidMount() {
        this.refresh()
    }

    render() {
        const { visible, loading, loadingModal, columns, breadcrumbList, itemList, pagination } = this.state;
        const { checkPendingList } = this.props;
        const tabList = [{
            key: '待审核详情',
            tab: '待审核',
        }, {
            key: '审核未通过详情',
            tab: '审核未通过',
        }, {
            key: '审核失败详情',
            tab: "审核失败",
        }, {
            key: '审核成功详情',
            tab: '审核成功',
        }];
        return (
            <div>
                <PageHeader
                    title="管理费审核"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={breadcrumbList}
                    tabList={tabList}
                    onTabChange={this.onTabChange}
                />
                <div className="tableBox">
                    <Table columns={columns} dataSource={itemList} bordered rowKey={record => record.id}
                        pagination={pagination}
                        onChange={this.handleTableChange}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }

    //切换
    onTabChange = (key) => {
        console.log(key);
        this.state.pagination.current = 1;
        this.setState({
            pagination: this.state.pagination
        })
        switch (key) {
           
            case "待审核详情":
                this.state.url = "/managefee/auditList";
                this.curCheckState = "managefee-checkPending";
                break;
            case "审核未通过详情":
                this.state.url = "/managefee/rejectList";
                this.curCheckState = "managefee-unapprove";
                break;
            case "审核失败详情":
                this.state.url = "/managefee/failList";
                this.curCheckState = "managefee-checkFail";
                break;
            case "审核成功详情":
                this.state.url = "/managefee/sucList";
                this.curCheckState = "managefee-checkSuccess";
                break;
        }
        this.setState({
            url: this.state.url,
            curTableType: this.state.curTableType,
        })
        console.log(this.state.url);
        console.log(this.state.curCheckState);
        console.log(this.state.curTableType);
        this.refresh(key)
    }
    //跳转到详情页
    linkDetails = (record) => {
        sessionStorage.setItem("curCheckPending", JSON.stringify(record))//存储当前需要审核的单子的详情
        sessionStorage.setItem("curCheckState", this.state.curCheckState)//存储当前需要审核的单子的详情
        this.props.history.push("/main/checkManageFeeDetails")
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

function filterCheckPendingList(store) {
    return {
        checkPendingList: store.chackPendingList
    }
}

export default connect(filterCheckPendingList)(checkPending)
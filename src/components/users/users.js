import React from "react";
import { Table, Button, Input, Modal, Radio, Form, Icon, Select, Tabs, Row, Col, Checkbox, Popconfirm } from 'antd';
import { connect } from 'react-redux'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import { getUsersList, getroleList, addUsers, removeUsers, changeUsers, getUserRole, searchUsersList } from "../../redux/actions/acUsers/acUsers";

require("./users.less")


const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};


class users extends React.Component {
    state = {
        //inputdata是修改时候的输入框内容
        inputData: {},
        //下面是切换Tab时候的显示内容
        tab2Name: '新增用户',
        activeKey: "1",
        //下面是搜索栏的内容
        expand: true,
        labels: ['姓名', '账号', '电话'],
        ok: ["a", "b", "c"],
        //多选框的默认选中
        //数组包对象的角色list
        checkedList: [],
        //纯数组的只有显示名字的list
        checkedroList: [],
        //默认下的多选框勾选情况
        changeChecked: [],
        //只有名字的多选框
        roIds: [],
        //在新增用户页面下的多选框勾选情况
        newCheckd: [],

        data: [],
        //修改时候的个人ID
        personId: '',
        pagination: {
            current: 1,
            pageSize: 1,
            total: 0
        },
        modalvisible: false,
        msg: '',
        loading: false,
        loadingReset: false,
        loadingSubmit: false,
        loadingCancel: false,
        breadcrumbList: [{
            title: '首页',
            href: '#/main/index',
        }, {
            title: '系统设置',
        }, {
            title: '用户信息',
        }],
        tabList: [{
            key: '页签一',
            tab: '用户信息',
        }, {
            key: '页签二',
            tab: '新增用户',
        }],
        columns: [{
            title: "姓名",
            dataIndex: "realName"
        }, {
            title: "账号",
            dataIndex: 'userName',
        }, {
            title: "密码",
            dataIndex: "passwd",
            render: (text) =>
                <div>******</div>
        }, {
            title: "电话",
            dataIndex: "userPhone"
        }, {
            title: "操作",
            key: "action",
            render: (record) => <div>
                <a href="javascript:;" onClick={() => this.changeUser(record)}>修改</a>
                丨
                                        {/* <a href="javascript:;" onClick={() => this.removeUser(record)}>删除</a> */}
                <Popconfirm title="确定要删除吗?" onConfirm={() => this.removeUser(record)}>
                    <a href="#">删除</a>
                </Popconfirm>
            </div>
        },]
    };

    //换页
    handleTableChange = (pagination) => {
        // console.log(pagination)
        this.setState({ loading: true });
        setTimeout(() => {
            getUsersList(pagination.current, (action) => {
                this.props.dispatch(action);
                let num = this.props.usersList.total
                let sun = this.props.usersList.pageSize
                this.setState({
                    loading: false,
                    data: this.props.usersList.result,
                    pagination: {
                        total: num,
                        pageSize: sun,
                    }
                });
            })
        }, 200);

    };

    refresh = () => {
        this.setState({ loading: true });
        getUsersList(this.state.pagination.current, (action) => {
            this.props.dispatch(action);
            // console.log(this.props.usersList)
            let num = this.props.usersList.total
            let sun = this.props.usersList.pageSize
            this.setState({
                loading: false,
                data: this.props.usersList.result,
                pagination: {
                    total: num,
                    pageSize: sun,
                }
            });
        })
    };
    componentDidMount() {
        getroleList((action) => {
            let arr = []
            let list = this.props.dispatch(action).data
            for (let value of list) {
                arr.push(value.roleName)
            }
            this.setState({
                checkedList: list,
                checkedroList: arr
            })
            // console.log(arr)
        })
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


    //重置搜索框
    handleReset = () => {
        this.setState({
            loadingReset: true
        })
        this.refresh()
        this.refs.a.input.value = ''
        this.refs.c.input.value = ''
        this.refs.b.input.value = ''
        setTimeout(() => {
            this.setState({ loadingReset: false });
        }, 300);
    }
    //切换状态来显示搜索框的多少
    // toggle = () => {
    //     const { expand } = this.state;
    //     this.setState({ expand: !expand });
    // }
    // 下面函数是生成搜索栏的input框内容
    getFields() {
        const count = this.state.expand ? 3 : 3;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const children = [];
        for (let i = 0; i < 3; i++) {
            children.push(
                <Col span={4} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} label={this.state.labels[i]}>

                        <Input placeholder="请输入" ref={this.state.ok[i]} />

                    </FormItem>
                </Col>
            );
        }
        return children;
    }


    render() {
        const { visible, loading, loadingSubmit, loadingReset, loadingCancel, columns, visible1, inputData, } = this.state;

        const { usersList } = this.props

        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="用户管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    // tabList={this.state.tabList}
                    content={
                        <div>
                            <Input type='text' style={{ width: "20%", marginRight: 10, marginBottom: 17 }} ref='a' placeholder='请输入姓名' />
                            <Input type='text' style={{ width: "20%", marginRight: 10, marginBottom: 17 }} ref='b' placeholder='请输入账户' />
                            <Input type='text' style={{ width: "20%", marginRight: 10, marginBottom: 17 }} ref='c' placeholder='请输入手机' />
                            <Button type="primary" htmlType="submit" style={{ marginTop: 1 }} onClick={this.handleSearch} loading={loadingSubmit}>查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset} loading={loadingReset}>
                                重置
                            </Button>
                        </div>
                    }
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                />
                <div id="bodyDiv" className="tableBox">
                    <Tabs defaultActiveKey="1" type="card" activeKey={this.state.activeKey} onChange={this.tabsOnChange}>
                        <TabPane tab="用户信息" key="1">


                            <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id}
                                // rowSelection={rowSelection}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                onChange={this.handleTableChange}
                                bordered
                            />
                        </TabPane>
                        <TabPane tab={this.state.tab2Name} key="2" className="inputDiv">
                            <p><label>姓名：</label><Input ref='realName' size="large" type="text" placeholder="" /></p>
                            <p><label>账号：</label><Input ref='userName' size="large" type="text" placeholder="" /></p>
                            <p><label>密码：</label><Input ref='passwd' size="large" type="password" placeholder="" /></p>
                            <p><label>电话：</label><Input ref='userPhone' size="large" type="text" placeholder="" /></p>
                            <CheckboxGroup options={this.state.checkedroList} value={this.state.tab2Name == "新增用户" ? this.state.newCheckd : this.state.changeChecked} onChange={this.checkedOnChange}></CheckboxGroup>
                            <p>
                                <Button key="submit" type="primary" size="large" loading={loadingSubmit} onClick={this.handleOk}>确定</Button>
                                <Button key="back" size="large" onClick={this.handleCancel} loading={loadingCancel}>取消</Button>
                            </p>
                        </TabPane>
                    </Tabs>
                    <Modal
                        title="警告"
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

    modalOk = () => {
        this.setState({
            modalvisible: false
        })
    }
    //点击取消按钮（新增页和修改页的是一个按钮）
    handleCancel = () => {
        this.setState({ loadingCancel: true });
        this.refs.realName.input.value = ''
        this.refs.userName.input.value = ''
        this.refs.passwd.input.value = ''
        this.refs.userPhone.input.value = ''
        setTimeout(() => {
            this.setState({
                loadingCancel: false,
                activeKey: "1",
                tab2Name: "新增用户",
                newCheckd: []
            });
            this.refresh()
        }, 500);

    }
    //点击修改按钮后的操作 
    changeUser = (record) => {
        console.log(record);
        this.setState({ loading: true });
        getUserRole(record.id, (action) => {
            this.props.dispatch(action)
            // console.log(this.props.dispatch(action))
            //下面做的是把状态为1的选出来，作为select的默认选中
            let arr = this.props.dispatch(action).data
            let arr1 = []
            let arr2 = []
            for (let value of arr) {
                if (value.state == 1) {
                    arr1.push(value.roleName)
                    arr2.push(value)
                }
            }
            // console.log(arr1)
            this.setState({
                changeChecked: arr1,
                roIds: arr1,
            })
        })
        setTimeout(() => {
            this.setState({
                activeKey: "2",
                tab2Name: "修改用户",
                loading: false,
                personId: record.id

            });
            // console.log(this)
            this.refs.realName.input.value = record.realName
            this.refs.userName.input.value = record.userName
            this.refs.passwd.input.value = record.passwd
            this.refs.userPhone.input.value = record.userPhone
        }, 500);

    }
    //点击删除按钮的操作
    removeUser = (record) => {
        // console.log(record);
        // console.log('删除')


        removeUsers(record.id, (action) => {
            this.props.dispatch(action)
            this.refresh()
        })

    }
    //点击确认按钮（新增页和修改页的是一个按钮）
    handleOk = () => {
        let arr = this.state.roIds
        let ids = []
        for (let value of this.state.checkedList) {
            for (let i = 0; i < arr.length; i++) {
                if (value.roleName == arr[i]) {
                    ids.push(value.id)
                }
            }
        }

        let item = {
            realName: this.refs.realName.input.value,
            userName: this.refs.userName.input.value,
            passwd: this.refs.passwd.input.value,
            userPhone: this.refs.userPhone.input.value,
            ids: ids,
            id: this.state.personId
        }
        if (item.userPhone.length != 11) {
            this.setState({
                modalvisible: true,
                msg: "请输入正确的11位手机号码",
                loadingSubmit: false
            })
            return;
        } else if (item.realName.length == 0 || item.userName.length == 0 || item.passwd.length == 0) {
            this.setState({
                modalvisible: true,
                msg: "所有项为必填项",
                loadingSubmit: false
            })

            return;
        }
        this.setState({
            loadingSubmit: true,
            inputData: {
                realName: this.refs.realName.input.value,
                userName: this.refs.userName.input.value,
                passwd: this.refs.passwd.input.value,
                userPhone: this.refs.userPhone.input.value,
                ids: ids
            }
        });
        if (this.state.tab2Name == "新增用户") {
            // console.log(item)
            addUsers(item, (action) => {
                this.props.dispatch(action)
                console.log(this.props.usersList.data)
                if (this.props.usersList.data.code == 0) {
                    this.refs.realName.input.value = ''
                    this.refs.userName.input.value = ''
                    this.refs.passwd.input.value = ''
                    this.refs.userPhone.input.value = ''

                    this.setState({
                        activeKey: "1",
                        tab2Name: "新增用户",
                        loadingSubmit: false
                    });
                    this.refresh()
                } else if (this.props.usersList.data.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.usersList.data.message,
                        loadingSubmit: false
                    })
                }

            })

        } else {
            console.log(item)
            changeUsers(item, (action) => {
                // console.log(item)
                this.props.dispatch(action)
                // console.log(a)
                if (this.props.usersList.data.code == 0) {
                    this.refs.realName.input.value = ''
                    this.refs.userName.input.value = ''
                    this.refs.passwd.input.value = ''
                    this.refs.userPhone.input.value = ''
                    this.setState({
                        activeKey: "1",
                        tab2Name: "新增用户",
                        loadingSubmit: false
                    });
                    this.refresh()
                } else if (this.props.usersList.data.code > 0) {
                    this.setState({
                        modalvisible: true,
                        msg: this.props.usersList.data.message,
                        loadingSubmit: false
                    })
                }
            })



        }
        this.handleCancel()

        // setTimeout(() => {

        // }, 500);

    }
    //点击查询按钮后
    handleSearch = () => {
        this.setState({ loadingSubmit: true })
        // console.log(this.refs.a.refs.input.value)
        let item = {
            userName: this.refs.b.input.value,
            realName: this.refs.a.input.value,
            userPhone: this.refs.c.input.value,
        }
        searchUsersList(item, (action) => {
            this.props.dispatch(action)
            // filterUsersList(users)
            this.setState({
                loadingSubmit: false,
                data: this.props.dispatch(action).data.result
            })

        })
    }
    //点击多选框后
    checkedOnChange = (checked) => {

        if (this.state.tab2Name == '新增用户') {
            this.setState({
                roIds: checked,
                newCheckd: checked
            })
        } else {
            this.setState({
                roIds: checked,
                changeChecked: checked
            })
        }

        // console.log(checked);
    }
    //点击单选框
    selectRadio = (e) => {
        // console.log(e.target.value);
    }
}
function filterUsersList(store) {
    // console.log(store);
    return {
        usersList: store.usersManage
    }
}

export default connect(filterUsersList)(users)
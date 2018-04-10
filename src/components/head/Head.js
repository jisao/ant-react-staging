import React from 'react'
import axios from 'axios'
import { Icon, Layout, Input, Avatar, Popover, Badge, Tooltip, Tabs, Tag, Dropdown, Menu, Modal, notification } from 'antd'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { connect } from 'react-redux'
import moment from 'moment';
import groupBy from 'lodash/groupBy';
const TabPane = Tabs.TabPane;
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';//顶部搜索框

const { Header } = Layout
require("./head.less")

import { userLogOut, changePwd } from "../../redux/actions/head/achead";


let getMsgTimer = null;


class Head extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            curMsgList: [],
            curItemList: [],//保存本地推送的消息
            popupVisible: true,
            msg: '',
            modalVisible: false,
        }
    }

    render() {
        let { data, popupVisible } = this.state
        let { collapsed, toggle } = this.props
        const text = <span>Title</span>;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">修改密码</Menu.Item>
                <Menu.Item key="2">退出登陆</Menu.Item>
            </Menu>
        );

        return (
            <Header className="head" id="sysHead">
                {/* <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} /> */}
                <span></span>
                <div className="head_right">
                    <audio src="http://xinghuoniu-image.oss-cn-shenzhen.aliyuncs.com/1517479154347_1517479154347.mp3" id="msgAudio" controls="controls" preload="true" hidden/>
                    <HeaderSearch
                        placeholder="站内搜索"
                        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                        onSearch={(value) => {
                            // console.log('input', value); // eslint-disable-line
                        }}
                        onPressEnter={(value) => {
                            // console.log('enter', value); // eslint-disable-line
                        }}
                    />

                    <NoticeIcon
                        className="notice-icon"
                        count={this.state.curMsgList.length}
                        // onItemClick={this.onItemClick}
                        
                        // onClear={this.onClear}
                        popupAlign={{ offset: [20, -16] }}
                    // popupVisible = {popupVisible}
                    >
                        {/* <NoticeIcon.Tab
                            list={this.state.curMsgList}
                            title="通知"
                            emptyText="你已查看所有通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        /> */}
                        <NoticeIcon.Tab
                            list={this.state.curMsgList}
                            title="消息"
                            emptyText="您已读完所有消息"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                        />
                        {/* <NoticeIcon.Tab
                            list={noticeData['待办']}
                            title="待办"
                            emptyText="你已完成所有待办"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                        />  */}
                    </NoticeIcon>
                    <div className="userInfo">
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <span className='userName'>{sessionStorage.item ? JSON.parse(sessionStorage.item).data.user : '游客'}</span>
                        <Dropdown.Button onClick={this.logOut} overlay={menu}>
                            退出
                        </Dropdown.Button>

                    </div>
                </div>
                <Modal
                    title="修改密码"
                    visible={this.state.modalVisible}
                    onOk={this.modalOk}
                    onCancel={this.modalCa}
                >
                    <label>旧密码：</label><Input type='text' ref='old' style={{ width: "66%", marginRight: "10%", marginLeft: "10%", marginBottom: 20 }} />
                    <label>新密码：</label><Input type='text' ref='new' style={{ width: "66%", marginRight: "10%", marginLeft: "10%", marginBottom: 20 }} />
                    <p style={{ color: "red" }}>{this.state.msg}</p>
                </Modal>
            </Header>
        )
    }


    componentDidMount() {
        if (sessionStorage.item) {
            this.getMsg()
            clearInterval(getMsgTimer)
            getMsgTimer = setInterval(() => {

                this.getMsg()
            }, 10000)
        }
    }

    componentWillUnmount() {
        clearInterval(getMsgTimer)
    }

    //获取后台消息
    getMsg = async () => {
        let obj = await axios({
            method: 'POST',
            url: '/tips/all',
            headers: {
                accessKey: JSON.parse(sessionStorage.item).data.accessKey
            }
        })

        //保存之前的curMsgList
        let oldMsgList = [...this.state.curItemList]
        let arr = [];
        if (obj.data.code == 0) {
            for (let val of obj.data.data.result) {
                arr.push({
                    id: val.id,
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                    title: val.title,
                    description: val.content,
                    datetime: this.formatDate(val.gmtCreate),
                    type: '消息',
                })
            }
            this.setState({
                curMsgList: arr,
                curItemList: obj.data.data.result
            })
            if (obj.data.data.result.length > oldMsgList.length) {
                document.querySelector("#sysHead .anticon-bell").setAttribute("data-type", "newMsg");
                document.querySelector('#msgAudio').play()
            } else {
                document.querySelector("#sysHead .anticon-bell").setAttribute("data-type", "");
                document.querySelector('#msgAudio').pause()            
            }
        }else{
            this.openNotificationWithIcon('error',obj.data.message)
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

    modalOk = () => {
        let old1 = this.refs.old.input.value
        let new1 = this.refs.new.input.value
        if (new1.length < 0) {
            this.setState({
                msg: '新密码输入不正确'
            })
            return;
        }
        changePwd(old1, new1, (action) => {
            this.props.dispatch(action)
            if (this.props.usersList.code == 0) {
                this.modalCa()
            } else if (this.props.usersList.code > 0) {
                this.setState({
                    msg: this.props.usersList.message
                })
            }
        })

    }
    modalCa = () => {
        this.refs.old.input.value = ''
        this.refs.new.input.value = ''
        this.setState({
            msg: '',
            modalVisible: false
        })
    }
    handleMenuClick = (e) => {
        // console.log('click left button', e.key);
        if (e.key == '2') {
            this.logOut()
        } if (e.key == '1') {
            this.setState({
                modalVisible: true
            })
        }
    }




    //消息切换时候的回调
    callback(key) {
        // console.log(key);
    }
    logOut() {
        // session.removeAttribute("item")
        // this.props.history.push("/")
        userLogOut((action) => {
            this.props.dispatch(action)
        })

        sessionStorage.removeItem('item')
        location.href = ("index.html")
    }
    //点击搜索
    clickSearch(value) {
        console.log(value)
    }

    //消息框函数

    onItemClick = async (item, tabProps) => {
        // let obj = await axios({
        //     method: 'POST',
        //     url: '/tips/complete',
        //     headers: {
        //         accessKey: JSON.parse(sessionStorage.item).data.accessKey
        //     },
        //     params: {
        //         id: item.id
        //     }
        // })
        // console.log(obj.data);
        // if(obj.data.code==0){
        //     document.querySelector("#sysHead .anticon-bell").setAttribute("data-type", "");
        //     this.getMsg()
        // }else{
        //     this.openNotificationWithIcon('error',obj.data.message)
        // }
    }

    onClear = (tabTitle) => {
        // console.log(tabTitle);
    }

     //提醒框公用函数
     openNotificationWithIcon = (type, text) => {
        notification[type]({
            message: '提示框',
            description: text,
            placement:'bottomRight',
        });
    };

}

function filterUsersList(store) {
    return {
        usersList: store.userLogOut
    }
}

export default connect(filterUsersList)(Head)
import React from 'react';
import { Layout, Icon, Avatar, Dropdown, Menu, Tag } from 'antd'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import moment from 'moment';
import './Head.scss';
import groupBy from 'lodash/groupBy';
const { Header } = Layout

const data = [{
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: '通知',
}, {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: '通知',
}, {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: '通知',
}, {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: '通知',
}, {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: '通知',
}, {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: '待办',
}, {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: '待办',
}, {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: '待办',
}, {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: '待办',
}];
function onItemClick(item, tabProps) {
    console.log(item, tabProps);
}

function onClear(tabTitle) {
    console.log(tabTitle);
}

function getNoticeData(notices) {
    if (notices.length === 0) {
        return {};
    }
    const newNotices = notices.map((notice) => {
        const newNotice = { ...notice };
        if (newNotice.datetime) {
            newNotice.datetime = moment(notice.datetime).fromNow();
        }
        // transform id to item key
        if (newNotice.id) {
            newNotice.key = newNotice.id;
        }
        if (newNotice.extra && newNotice.status) {
            const color = ({
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold',
            })[newNotice.status];
            newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
        }
        return newNotice;
    });
    return groupBy(newNotices, 'type');
}

const noticeData = getNoticeData(data);

class Head extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    render() {

        return (
            <div id="head">
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                    <div className="head_right">
                        <audio src="http://xinghuoniu-image.oss-cn-shenzhen.aliyuncs.com/1517479154347_1517479154347.mp3" id="msgAudio" controls="controls" preload="true" hidden />

                        <NoticeIcon
                            className="notice-icon"
                            count={data.length}
                            onItemClick={onItemClick}
                            onClear={onClear}
                            popupAlign={{ offset: [20, -16] }}
                        >
                            <NoticeIcon.Tab
                                list={data}
                                title="通知"
                                emptyText="你已查看所有通知"
                                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                            />
                            <NoticeIcon.Tab
                                list={noticeData['消息']}
                                title="消息"
                                emptyText="您已读完所有消息"
                                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                            />
                            <NoticeIcon.Tab
                                list={noticeData['待办']}
                                title="待办"
                                emptyText="你已完成所有待办"
                                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                            />
                        </NoticeIcon>
                        <Dropdown overlay={
                            <Menu onClick={this.clickUserMenu}>
                                <Menu.Item key="0">
                                    <Icon type="user" />
                                    <span style={{ marginLeft: 5 }}>个人中心</span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="1" >
                                    <Icon type="frown-o" />
                                    <span style={{ marginLeft: 5 }} onClick={this.clickLogout}>退出登陆</span>
                                </Menu.Item>
                            </Menu>
                        } placement="bottomRight">
                            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large" id="avatar">
                                kola
                        </Avatar>
                        </Dropdown>
                    </div>
                </Header>
            </div>
        )
    }

    clickLogout = () => {
        console.log(1);
        sessionStorage.removeItem('login')
        location.href = ('index.html')
    }

    clickUserMenu = (key) => {
        console.log(key);
        switch (key) {
            case "0":
                console.log('个人中心');
                break;

            case "1": this.clickLogout()

                break;
        }
    }


    //获取后台消息，以及铃声的提醒
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
        } else {
            this.openNotificationWithIcon('error', obj.data.message)
        }
    }


}

export default Head
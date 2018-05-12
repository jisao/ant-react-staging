import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { rootSubmenuKeys } from '../config/menu'
import defaultConfig from '../config/default'

const { SubMenu } = Menu
const { Header, Sider, Content, Footer } = Layout;

import './SideBar/SideBar.scss'
//引入模块组件
import Sidebar from './SideBar/SideBar.jsx'//侧边导航栏
import Head from './Head/Head.jsx'//主窗口头部
import Routes from './Routes.jsx'//侧边导航路由


class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            collapsed: false,
            // openKeys: [`${rootSubmenuKeys[0]}`],
            openKeys: [''],
            MenuTheme: 'light',//默认为白色,
        }
    }

    render() {

        let { collapsed, openKeys, MenuTheme } = this.state

        return (
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} className={MenuTheme === 'light' ? 'light' : 'dark'} collapsed={collapsed} width={200} collapsedWidth={80}
                        id="sideBar">
                        <Sidebar MenuTheme={MenuTheme} changeTheme={this.changeTheme} collapsed={collapsed} openKeys={openKeys} onOpenChange={this.onOpenChange}></Sidebar>
                    </Sider>
                    <Layout>
                        <Head collapsed={collapsed} toggle={this.toggle}></Head>
                        <Layout>
                            <Content id="containerScreen">
                                <Routes></Routes>
                                <GlobalFooter className="loginFooter" copyright={<div>Copyright <Icon type="copyright" /> {defaultConfig.footerText}</div>} />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
        );
    }

    componentDidMount() {
        if (!(sessionStorage.login)) {
            this.props.history.push("/")
        } else {
            // this.props.history.push("/routes/Analyze")
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (!this.state.collapsed) {
            this.setState({
                openKeys: [],
            });
        }
    }
    //设置手风琴样式,只允许展开一个
    onOpenChange = (openKeys) => {
        console.log('展开项目',openKeys)
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    //改变主题色
    changeTheme = (checked) => {
        if (checked) {
            this.setState({
                MenuTheme: 'light'
            })
        } else {
            this.setState({
                MenuTheme: 'dark'
            })
        }
    }
}

export default App
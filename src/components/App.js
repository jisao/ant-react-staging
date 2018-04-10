import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { SubMenu } = Menu
const { Header, Sider, Content, Footer } = Layout;
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

//引入模块组件
import Sidebar from './sidebar/Sidebar'//侧边导航栏
import Head from './head/Head'//主窗口头部
import SideRouter from './sideRouter/SideRouter'//侧边导航路由

require("../style/css/index.less")
let  getMsgTimer = null;
class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            collapsed: false,
            curMsgList: []
        }
    }

    render() {
        return (
            <Router id="sys_container">
                <Layout>
                    <Sider trigger={null} collapsed={this.state.collapsed} width={200} collapsedWidth={80}
                        id="sidebar">
                        <Sidebar collapsed={this.state.collapsed}></Sidebar>
                    </Sider>
                    <Layout>
                        <Head collapsed={this.state.collapsed} toggle={this.toggle}></Head>
                        <Layout>
                            <Content id="containerScreen">
                                <SideRouter></SideRouter>
                                <GlobalFooter className="loginFooter" copyright={<div>Copyright <Icon type="copyright" /> 2017 星火技术部出品</div>} />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        );
    }

    componentDidMount() {
        if (!(sessionStorage.item)) {
            this.props.history.push("/")
        }
    }
    toggle=()=> {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
}

export default App
import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom'
import { menusData } from '../../config/menu'
import defaultConfig from '../../config/default'

import './SideBar.scss'
const SubMenu = Menu.SubMenu
class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {


        return (
            <div style={{ height: '100%' }}>

                <div className="logo">
                    <img src={defaultConfig.logo} height="40" alt="logo" />
                    <span className={this.props.collapsed ? "hide" : ""}>{defaultConfig.name}</span>
                </div>
                <Menu theme={this.props.MenuTheme} mode="inline" defaultSelectedKeys={["0-0"]} openKeys={this.props.openKeys} onOpenChange={this.props.onOpenChange}>
                    {
                        menusData.map((item, index) => {
                            return (
                                <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                    {
                                        item.children.map((children, i) => {
                                            return(
                                                <Menu.Item key={`${index}-${i}`}><Link to={children.path}>{children.name}</Link></Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
                <div className={this.props.MenuTheme === 'light' ? 'footer' : 'footer dark'}>
                    <span className={this.props.collapsed ? 'hide' : ''}>change theme</span>
                    <Switch checkedChildren="light" unCheckedChildren="dark" defaultChecked onChange={this.props.changeTheme} />
                </div>
            </div>
        )
    }

}

export default SideBar
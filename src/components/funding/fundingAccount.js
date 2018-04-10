import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom'
import PageHeader from 'ant-design-pro/lib/PageHeader';

import fundingAccount from "./fundingAccountTab1";

require("./fundingAccount.less")

class fundingAccountAll extends React.Component {


    state = {
        breadcrumbList: [
            {
                title: '首页',
                href: '#/main/index',
            }, {
                title: '配资管理',
            }, {
                title: '账户管理',
            }],
    }

    render() {
        const tabList = [{
            // key: '1',
            // tab: '账户管理',
        },
        ];
        return (
            <div>
                <PageHeader className="UsersPageHeader"
                    title="账户管理"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                    breadcrumbList={this.state.breadcrumbList}
                    content=""
                    action={<div className="action"></div>}
                    extraContent={<div className="extraContent"></div>}
                    onTabChange={this.onTabChange}
                    tabList={tabList}
                />
                <Router>
                    <div>
                        <Route path="/main/fundingAccountAll/" exact component={fundingAccount}></Route>
                        {/* <Route path="/main/fundingAccountAll/role" component={role}></Route>
                        <Route path="/main/fundingAccountAll/users" component={users}></Route> */}
                    </div>
                </Router>

            </div>
        )

    }
}
export default fundingAccountAll
//账户管理分了4个小的模块,用router来导航,现在只有一个,就把它隐藏起来.
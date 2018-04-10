import React from 'react'
import { Menu, Icon } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from "react-redux"

const SubMenu = Menu.SubMenu;

require("./sidebar.less")
import { getUserPositon } from "../../redux/actions/jurisdiction/acjurisdiction";

//定义系统设置的资源码

class Sidebar extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12', 'sub13','sub14'];
  state = {
    openKeys: [''],
    roleBool: false,
    data: [],
    systemSetup:
      [
        { name: "配资管理", bool: false },
        { name: "配置审核", bool: false },
        { name: "保证金管理", bool: false },
        { name: "资金审核", bool: false },
        { name: "提盈管理", bool: false },

        { name: "提盈审核", bool: false },
        { name: "终止交易管理", bool: false },
        { name: "终止交易审核", bool: false },
        { name: "用户管理", bool: false },
        { name: "账户管理", bool: false },

        { name: "证券管理", bool: false },
        { name: "账户信息", bool: false },
        { name: "券商信息", bool: false },
        { name: "资金对账", bool: false },
        { name: "渠道对账", bool: false },

        { name: "内容管理", bool: false },
        { name: "版本管理", bool: false },
        { name: "轮播图管理", bool: false },
        { name: "首页信息管理", bool: false },
        { name: "系统设置", bool: false },

        { name: "用户信息", bool: false },
        { name: "角色管理", bool: false },
        { name: "资源管理", bool: false },
        { name: "假日管理", bool: false },
        { name: "配资配置", bool: false },

        { name: "连接管理", bool: false },
        { name: "图片管理", bool: false },
        { name: "审核管理", bool: false },
        { name: "审核信息", bool: false },
        { name: "平台保证金", bool: false },

        { name: "平台保证金(子模块)", bool: false },
        { name: "盈利管理", bool: false },
        { name: "盈利管理费", bool: false },
        { name: "盈利手续费", bool: false },
        { name: "股票管理", bool: false },

        { name: "配资账户", bool: false },
        { name: "富文本编辑器", bool: false },
        { name: "新闻资讯配置", bool: false },
        { name: "手工对账", bool: false },
        { name: "任务中心", bool: false },

        { name: "管理费管理", bool: false },
        { name: "管理费审核", bool: false },//写到0-41了
      ]

  };
  componentWillMount() {
    this.setState({
      data: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
    })
  }
  componentDidMount() {
    let arr = this.state.data
    let arr1 = this.state.systemSetup
    for (let i = 0; i < arr1.length; i++) {
      if (arr.indexOf(arr1[i].name) != -1) {
        arr1[i].bool = true
      } else {
        arr1[i].bool = false
      }
    }
    this.setState({
      systemSetup: arr1
    })
  }
  render() {
    let { collapsed } = this.props
    let { systemSetup } = this.state
    return (
      <div>
        <div className="logo">
          <img src={require('./logo.png')} height="40" alt="logo" />
          <span className={collapsed ? "hide" : ""}>Xing Huo</span>
        </div>
        <Menu className="sidebar_container" theme='dark' mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} >

          {systemSetup[0].bool ?
            <SubMenu key="sub1" title={<span><Icon type="form" /><span>配资管理</span></span>}>
              {systemSetup[1].bool ? <Menu.Item key="1-1"><Link to="/main/checkPending">配资审核</Link></Menu.Item> : ''}
            </SubMenu> : ''}

          {systemSetup[2].bool ?
            <SubMenu key="sub2" title={<span><Icon type="bank" /><span>保证金管理</span></span>}>
              {systemSetup[3].bool ? <Menu.Item key="2-1"><Link to="/main/cashDeposit">资金审核</Link></Menu.Item> : ''}
            </SubMenu> : ''}

          {systemSetup[4].bool ?
            <SubMenu key="sub3" title={<span><Icon type="export" /><span>提盈管理</span></span>}>
              {systemSetup[5].bool ? <Menu.Item key="3-1"><Link to="/main/ExtractGain">提盈审核</Link></Menu.Item> : ''}
            </SubMenu> : ''}

          {systemSetup[6].bool ?
            <SubMenu key="sub4" title={<span><Icon type="exception" /><span>终止交易管理</span></span>}>
              {systemSetup[7].bool ? <Menu.Item key="4-1"><Link to="/main/stopTrade">终止交易审核</Link></Menu.Item> : ''}
            </SubMenu> : ''}

          {systemSetup[40].bool ?  
          <SubMenu key="sub14" title={<span><Icon type="calendar" /><span>管理费管理</span></span>}>
             {systemSetup[41].bool ?<Menu.Item key="14-1"><Link to="/main/checkManageFee">管理费审核</Link></Menu.Item>: ''}
          </SubMenu>: ''}


          {systemSetup[27].bool ? <SubMenu key="sub10" title={<span><Icon type="table" /><span>审核管理</span></span>}>
            {systemSetup[28].bool ? <Menu.Item key="10-1"><Link to="/main/reviewSteps">审核信息</Link></Menu.Item> : ''}
          </SubMenu> : ''}

          {systemSetup[8].bool ?
            <SubMenu key="sub5" title={<span><Icon type="user" /><span>用户管理</span></span>}>
              {systemSetup[9].bool ? <Menu.Item key="5-1"><Link to="/main/fundingAccountAll">账户管理</Link></Menu.Item> : ''}
              {systemSetup[35].bool ? <Menu.Item key="5-2"><Link to="/main/peiZAccount">配资账户</Link></Menu.Item> : ''}
            </SubMenu> : ''}


          {systemSetup[10].bool ? <SubMenu key="sub6" title={<span><Icon type="wallet" /><span>证券管理</span></span>}>
            {systemSetup[11].bool ? <Menu.Item key="6-1"><Link to="/main/securityManage">账户信息</Link></Menu.Item> : ''}
            {systemSetup[12].bool ? <Menu.Item key="6-2"><Link to="/main/brokerList">券商信息</Link></Menu.Item> : ''}
          </SubMenu> : ''}


          {systemSetup[13].bool ? <SubMenu key="sub7" title={<span><Icon type="pay-circle-o" /><span>资金对账</span></span>}>
            {systemSetup[14].bool ? <Menu.Item key="7-1"><Link to="/main/channelChecking">渠道对账</Link></Menu.Item> : ''}
            {systemSetup[38].bool ? <Menu.Item key="7-2"><Link to="/main/handworkChecking">手工对账</Link></Menu.Item> : ''}
          </SubMenu> : ''}


          {systemSetup[29].bool ? <SubMenu key="sub11" title={<span><Icon type="pay-circle" /><span>平台保证金</span></span>}>
            {systemSetup[30].bool ? <Menu.Item key="11-1"><Link to="/main/ptDeposit">平台保证金</Link></Menu.Item> : ''}
          </SubMenu> : ''}



          {systemSetup[15].bool ? <SubMenu key="sub8" title={<span><Icon type="mobile" /><span>内容管理</span></span>}>
            {systemSetup[16].bool ? <Menu.Item key="8-1"><Link to="/main/VersioningApp">版本管理</Link></Menu.Item> : ''}
            {systemSetup[17].bool ? <Menu.Item key="8-2"><Link to="/main/slide">轮播图管理</Link></Menu.Item> : ''}
            {systemSetup[18].bool ? <Menu.Item key="8-3"><Link to="/main/indexMsg">首页信息管理</Link></Menu.Item> : ''}
            {systemSetup[36].bool ? <Menu.Item key="8-4"><Link to="/main/editor">富文本编辑器</Link></Menu.Item> : ''}
            {systemSetup[37].bool ? <Menu.Item key="8-5"><Link to="/main/netnews">新闻资讯配置</Link></Menu.Item> : ''}
          </SubMenu> : ''}

          {systemSetup[31].bool ? <SubMenu key="sub12" title={<span><Icon type="calculator" /><span>成本管理</span></span>}>
            {systemSetup[32].bool ? <Menu.Item key="12-1"><Link to="/main/managementCost">管理费</Link></Menu.Item> : ''}
            {systemSetup[33].bool ? <Menu.Item key="12-2"><Link to="/main/serviceCharge">手续费</Link></Menu.Item> : ''}
          </SubMenu> : ''}

          {systemSetup[39].bool ? <SubMenu key="sub13" title={<span><Icon type="profile" /><span>任务中心</span></span>}>
            {systemSetup[39].bool ? <Menu.Item key="13-1"><Link to="/main/excelTask">Excel任务</Link></Menu.Item> : ''}
          </SubMenu> : ''}


          {systemSetup[19].bool ? <SubMenu key="sub9" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
            {systemSetup[20].bool ? <Menu.Item key="9-1"><Link to="/main/users">用户信息</Link></Menu.Item> : ''}
            {systemSetup[21].bool ? <Menu.Item key="9-2"><Link to="/main/role">角色管理</Link></Menu.Item> : ''}
            {systemSetup[22].bool ? <Menu.Item key="9-3"><Link to="/main/resource">资源管理</Link></Menu.Item> : ''}
            {systemSetup[23].bool ? <Menu.Item key="9-4"><Link to="/main/holiday">假日管理</Link></Menu.Item> : ''}
            {systemSetup[26].bool ? <Menu.Item key="9-7"><Link to="/main/uploadPic">图片管理</Link></Menu.Item> : ''}


            {systemSetup[34].bool ? <Menu.Item key="9-8"><Link to="/main/stockManagement">股票管理</Link></Menu.Item> : ''}


            {systemSetup[24].bool ? <Menu.Item key="9-5"><Link to="/main/fundingDeploy">配资配置</Link></Menu.Item> : ''}
            {systemSetup[25].bool ? <Menu.Item key="9-6"><Link to="/main/connectionManager">连接管理</Link></Menu.Item> : ''}

          </SubMenu> : ''}

        </Menu>
      </div>
    );

  }

  //设置手风琴样式,只允许展开一个
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
}



export default connect()(Sidebar)
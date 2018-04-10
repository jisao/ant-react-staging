import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

//首页
import Main from "../main/Main"

//=========================配资管理==========================================
//配资审核
import CheckPending from "../dailiProfit/checkPending/CheckPending"
import CheckPendingDetails from "../dailiProfit/checkPending/CheckPendingDetails"

//========================保证金管理=========================================
//保证金审核
import CashDeposit from "../dailiProfit/cashDeposit/CashDeposit"
import CashDepositDetails from "../dailiProfit/cashDeposit/CashDepositDetails"

//========================提盈管理=========================================
//提盈审核
import ExtractGain from "../dailiProfit/extractGain/ExtractGain"
import ExtractGainDetails from "../dailiProfit/extractGain/ExtractGainDetails"

//========================终止交易=========================================
//终止交易审核
import StopTrade from "../dailiProfit/stopTrade/StopTrade"
import StopTradeDetails from "../dailiProfit/stopTrade/StopTradeDetails"
//========================管理费管理=========================================
//终止交易审核
import CheckManageFee from "../dailiProfit/checkManageFee/checkManageFee"
import CheckManageFeeDetails from "../dailiProfit/checkManageFee/checkManageFeeDetails"

//====================系统设置========================
import users from "../users/users";
import role from "../users/role";
import holiday from "../users/holiday";
import resource from "../users/resource";
import VersioningApp from "../users/versioningApp";
import fundingDeploy from "../users/fundingDeploy";
import connectionManager from "../users/connectionManager";
import ReviewSteps from "../reviewSteps/reviewSteps";
import StockManagement from "../users/stockManagement";

//================APP管理=================
import Slide from "../app/slide";
import IndexMsg from "../app/indexMsg";
import Editor from "../app/editor";
import Netnews from "../app/netnews";

//上传图片管理
import UploadPic from "../users/UploadPic"


//平台保证金
import PtDeposit from "../ptDeposit/ptDeposit"


//=============任务中心==================
import ExcelTask from "../taskCenter/excelTask"

//=============盈利管理==============
//管理费管理
import ManagementCost from "../gain/managementCost"
//手续费
import ServiceCharge from "../gain/serviceCharge"

//=========================证券管理=================
import securityManage from "../security/securityManage";
import brokerList from "../security/brokerList";
//=================配资管理=================
// import fundingAccount from "../funding/fundingAccount";
import fundingAccountAll from "../funding/fundingAccount";
import PeiZAccount from "../funding/peiZAccount";

//============资金对账==============
import ChannelChecking from "../cashChecking/channelChecking";
import HandworkChecking from "../cashChecking/handworkChecking";

//定义系统设置的资源码
const systemSetup = [
    { name: "配置审核", bool: false },  { name: "资金审核", bool: false },
    { name: "提盈审核", bool: false },  { name: "终止交易审核", bool: false }, 
    { name: "账户管理", bool: false },  { name: "账户信息", bool: false },
    { name: "券商信息", bool: false },{ name: "渠道对账", bool: false },
    { name: "版本管理", bool: false },{ name: "轮播图管理", bool: false },

    { name: "首页信息管理", bool: false },{ name: "用户信息", bool: false },
    { name: "角色管理", bool: false }, { name: "资源管理", bool: false }, 
    { name: "假日管理", bool: false }, { name: "配资配置", bool: false },
    { name: "连接管理", bool: false }, { name: "图片管理", bool: false },
    { name: "审核信息", bool: false },{ name: "平台保证金(子模块)", bool: false },

    { name: "盈利管理费", bool: false }, { name: "盈利手续费", bool: false },
    { name: "股票管理", bool: false }, { name: "配资账户", bool: false }, 
    { name: "富文本编辑器", bool: false }, { name: "新闻资讯配置", bool: false }, 
    { name: "手工对账", bool: false },{ name: "任务中心", bool: false },
    { name: "管理费审核", bool: false },
    

]
class SideRouter extends React.Component {
    state={
        data:[],
    }

    componentWillMount() {
        this.setState({
            data: sessionStorage.item ? JSON.parse(sessionStorage.item).data.userPermiss : []
        })
    }
    componentDidMount() {
        let arr = this.state.data
        for (let i = 0; i < systemSetup.length; i++) {
            if (arr.indexOf(systemSetup[i].name) != -1) {
                systemSetup[i].bool = true
            }else{
                systemSetup[i].bool = false
            }
        }
        
    }

    render() {
        return (
            <Router>
                <div>
                    {/* 主页 */}
                    <Route path="/main/index" component={Main}></Route>

                    {/* 配资管理 */}
                    {systemSetup[0].bool?<Route path="/main/checkPending" component={CheckPending}></Route>:''}
                    {systemSetup[0].bool ? <Route path="/main/checkPendingDetails" component={CheckPendingDetails}></Route> : ''}

                    {/* 保证金管理 */}
                    {systemSetup[1].bool ? <Route path="/main/cashDeposit" component={CashDeposit}></Route> : ''}
                    {systemSetup[1].bool ? <Route path="/main/cashDepositDetails" component={CashDepositDetails}></Route> : ''}

                    {/* 提盈管理 */}
                    {systemSetup[2].bool ? <Route path="/main/extractGain" component={ExtractGain}></Route> : ''}
                    {systemSetup[2].bool ? <Route path="/main/extractGainDetails" component={ExtractGainDetails}></Route> : ''}

                    {/* 终止交易管理 */}
                    {systemSetup[3].bool ? <Route path="/main/stopTrade" component={StopTrade}></Route> : ''}
                    {systemSetup[3].bool ? <Route path="/main/stopTradeDetails" component={StopTradeDetails}></Route> : ''}

                    

                    {/* 用户管理 */}
                    {systemSetup[4].bool ? <Route path="/main/fundingAccountAll" component={fundingAccountAll}></Route> : ''}
                                            

                    {/* 证券管理 */}
                    {systemSetup[5].bool ? <Route path="/main/securityManage" component={securityManage}></Route> : ''}
                    {systemSetup[6].bool ? <Route path="/main/brokerList" component={brokerList}></Route> : ''}
               
                    {/* 资金对账 */}
                    {systemSetup[7].bool ? <Route path="/main/channelChecking" component={ChannelChecking}></Route> : ''}
             

                    {/* APP管理 */}
                    {systemSetup[8].bool ? <Route path="/main/versioningApp" component={VersioningApp}></Route> : ''}
                    {systemSetup[9].bool ? <Route path="/main/slide" component={Slide}></Route> : ''}
                    {systemSetup[10].bool ? <Route path="/main/indexMsg" component={IndexMsg}></Route> : ''}
             


                 
                    {systemSetup[11].bool ? <Route path="/main/users" component={users}></Route> : ''}
                    {systemSetup[12].bool ? <Route path="/main/role" component={role}></Route> : ''}
                    {systemSetup[13].bool ? <Route path="/main/resource" component={resource}></Route> : ''}
                    {systemSetup[14].bool ? <Route path="/main/holiday" component={holiday}></Route> : ''}
                    {systemSetup[15].bool ? <Route path="/main/fundingDeploy" component={fundingDeploy}></Route> : ''}
                    {systemSetup[16].bool ? <Route path="/main/connectionManager" component={connectionManager}></Route> : ''}
                    {systemSetup[17].bool ? <Route path="/main/uploadPic" component={UploadPic}></Route> : ''}
                    


                    {systemSetup[18].bool ? <Route path="/main/reviewSteps" component={ReviewSteps}></Route> : ''}

                    {systemSetup[19].bool ?
                    <Route path="/main/ptDeposit" component={PtDeposit}></Route> 
                         : ''}

                    {systemSetup[20].bool ?
                        <Route path="/main/managementCost" component={ManagementCost}></Route> 
                         : ''}

                    {systemSetup[21].bool ?
                        <Route path="/main/serviceCharge" component={ServiceCharge}></Route> 
                         : ''}
                    {systemSetup[22].bool ?
                        <Route path="/main/stockManagement" component={StockManagement}></Route>
                         : ''}
                    {systemSetup[23].bool ?
                        <Route path="/main/peiZAccount" component={PeiZAccount}></Route> 
                         : ''}
                         
                    {systemSetup[24].bool ?<Route path="/main/editor" component={Editor}></Route> : ''}

                    {systemSetup[25].bool ?<Route path="/main/netnews" component={Netnews}></Route> : ''}

                    {systemSetup[26].bool ?<Route path="/main/handworkChecking" component={HandworkChecking}></Route>: ''}

                    {systemSetup[27].bool ?<Route path="/main/excelTask" component={ExcelTask}></Route>: ''}

                    {/* 管理费管理 */}
                    {systemSetup[28].bool ?<Route path="/main/checkManageFee" component={CheckManageFee}></Route>: ''}
                    {systemSetup[28].bool ?<Route path="/main/checkManageFeeDetails" component={CheckManageFeeDetails}></Route>: ''}
                    
                </div>
            </Router>
        )
    }
}

export default SideRouter
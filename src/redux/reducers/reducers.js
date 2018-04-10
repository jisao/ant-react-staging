import { combineReducers} from 'redux'

//=================待审核==========================
import chackPendingList from './reDailiProfit/reCheckPending'//配资审核
import {cpDetails,nextStepRes, fundingOrderDetails} from './reDailiProfit/reCheckPendingDetails'//配资审核详情页面

//=================用户管理=========
import usersManage from "./reUsers/reUsers";
import roleManage from "./reUsers/reRole";
import holidayManage from "./reUsers/reHoliday";
import resourceList from "./reUsers/reResource";
import versioningAppManage from "./reUsers/reVersioningApp";
import stockManagement from "./reUsers/reStockManagement";

//==============审核管理===============
import reviewStepManage from "./reReviewSteps/reReviewSteps";

//=====================APP管理=================
import slideList from "./reApp/reSlide";
import indexMsg from "./reApp/reIndexMsg";
import netnewsList from "./reApp/reNetnews";

//=================证券管理==========
import securityManage from "./reSecurity/reSecurityManage";
import brokerList from "./reSecurity/reBrokerList";

//=================配资管理==========
import fundingAccount from "./reFunding/reFundingAccount";
import peiZAccountList from "./reFunding/rePeiZAccount";


import connectionManager from "./reFunding/reConnectionManager";
import fundingDeploy from "./reFunding/reFundingDeploy";

//=================登陆登出==========
import userLoginList from "./reLogin/reLogin";
import userLogOut from "./head/rehead";


//==============资金对账===========
import channelCheckingManage from "./reCashChecking/reChannelChecking";


//==============平台保证金===========
import ptDepositManage from "./rePtDeposit/rePtDeposit";


//==============盈利管理===========
import managementCostl_List from "./reGain/reManagementCost";
import serviceCharge_List from "./reGain/reServiceCharge";


//==========任务中心=============
import excelTask from "./reTaskCenter/reExcelTask";



export default combineReducers({
    userLoginList,//登陆
    userLogOut,//登出

    roleManage,//用户角色管理
    usersManage,//用户管理
    resourceList,//用户的资源
    holidayManage,//假期管理
    reviewStepManage,//审核步骤

    stockManagement,//股票管理

    slideList,//APP轮播图管理
    versioningAppManage,//app版本管理
    indexMsg,//首页信息管理
    netnewsList,//网页新闻资讯

    //===========任务中心============
    excelTask,


    
    //===========================审核管理===============================
    chackPendingList,//待审核
    cpDetails,//审核详情页
    nextStepRes,//审核点击下一步流程返回的数据
    fundingOrderDetails,//审核详情页配资订单的具体信息
    
    securityManage,//账户管理
    brokerList,//券商信息
//======================用户管理==============
    fundingAccount,//用户管理
    peiZAccountList,//配资账户


    connectionManager,//连接管理
    fundingDeploy,//配资配置

    channelCheckingManage,//渠道对账


    ptDepositManage,//平台保证金


    serviceCharge_List,//盈利管理的手续费管理
    managementCostl_List,//盈利管理的管理费管理
})

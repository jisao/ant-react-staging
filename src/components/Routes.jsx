import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

/*数据分析*/
import Analyze from './Statistics/Analyze.jsx'

/*详情页*/
import Detail from './Detail/Detail.jsx'

/*列表页*/
import NormalList from './List/NormalList.jsx'
import NormalList2 from './List/NormalList2.jsx'

/*表格*/
import Table1 from './Table/Table1.jsx'
import Table2 from './Table/Table2.jsx'
import Table3 from './Table/Table3.jsx'
import Table4 from './Table/Table4.jsx'

/**
 * 卡片
 */
import CardDemo from './Card/Card.jsx'

/**
 * 步骤条
 */
import StepDemo from './Step/Step.jsx'

/**
 * 小插件
 */
//试色器
import GetColor from './Plugin/GetColor.jsx'
//富文本编辑器
import EditorDemo from './Plugin/WangEditor.jsx'
//高德地图
import GDmap from './Plugin/GDmap.jsx'
//图片预览
import ShowImg from './Plugin/ShowImg.jsx'
class SideRouter extends React.Component {
    render() {
        return (
            <div>
                <Route path="/routes/Analyze" component={Analyze}></Route>
                <Route path="/routes/Detail" component={Detail}></Route>
                {/* 列表 */}
                <Route path="/routes/NormalList" component={NormalList}></Route>
                <Route path="/routes/NormalList2" component={NormalList2}></Route>
                {/* 表格 */}
                <Route path="/routes/Table1" component={Table1}></Route>
                <Route path="/routes/Table2" component={Table2}></Route>
                <Route path="/routes/Table3" component={Table3}></Route>
                <Route path="/routes/Table4" component={Table4}></Route>
                {/* 卡片 */}
                <Route path="/routes/CardDemo" component={CardDemo}></Route>
                {/* 步骤条 */}
                <Route path="/routes/StepDemo" component={StepDemo}></Route>
                {/* 小插件 */}
                <Route path="/routes/GetColor" component={GetColor}></Route>
                <Route path="/routes/EditorDemo" component={EditorDemo}></Route>
                <Route path="/routes/GDmap" component={GDmap}></Route>
                <Route path="/routes/ShowImg" component={ShowImg}></Route>
                <Route path="/routes/6" component={Analyze}></Route>

            </div>
        )
    }
}

export default SideRouter
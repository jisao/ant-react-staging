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

                <Route path="/routes/4" component={Analyze}></Route>
                <Route path="/routes/5" component={Analyze}></Route>
                <Route path="/routes/6" component={Analyze}></Route>
            </div>
        )
    }
}

export default SideRouter
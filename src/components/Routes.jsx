import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

/*数据分析*/
import Analyze from './Statistics/Analyze.jsx'

/*详情页*/
import Detail from './Detail/Detail.jsx'

class SideRouter extends React.Component {
    render() {
        return (
            <div>
                <Route path="/routes/Analyze" component={Analyze}></Route>
                <Route path="/routes/Detail" component={Detail}></Route>
                <Route path="/routes/3" component={Analyze}></Route>
                <Route path="/routes/4" component={Analyze}></Route>
                <Route path="/routes/5" component={Analyze}></Route>
                <Route path="/routes/6" component={Analyze}></Route>
            </div>
        )
    }
}

export default SideRouter
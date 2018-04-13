import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'


import App from './App.jsx'
import Login from './Login/Login.jsx'


class Rou extends React.Component {

    render() {
        return (
            <Router>
                <div style={{height:'100%'}}>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/routes" component={App}></Route>
                </div>
            </Router>
        )
    }
}

export default Rou
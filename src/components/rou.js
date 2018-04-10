import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'


import App from './App'
import Login from './login/login'


class Rou extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/main" component={App}></Route>
                </div>
            </Router>
        )
    }
}

export default Rou
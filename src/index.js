import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import axios from "axios"
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.less'
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://120.78.83.217:15002/controller-mng';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/controller-mng';
}
ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById("app"))


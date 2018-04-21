import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import axios from "axios"
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.less'

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById("app"))


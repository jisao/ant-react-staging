import React from 'react'
import ReactDOM from 'react-dom'
import Rou from './components/Rou'
import { Provider } from 'react-redux'
import {store} from './redux/store'
import 'ant-design-pro/dist/ant-design-pro.css'; 
import axios from "axios"
axios.defaults.baseURL = 'http://120.78.83.217:15002/controller-mng';
ReactDOM.render(<Provider store={store}><Rou/></Provider> , document.getElementById("app"))


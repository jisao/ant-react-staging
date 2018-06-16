import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import 'ant-design-pro/dist/ant-design-pro.css';

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById("app"))


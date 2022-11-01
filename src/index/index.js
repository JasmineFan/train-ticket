import React from "react";
import ReactDom from 'react-dom'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store'
import 'normalize.css/normalize.css'

// index.js 里面挂载 app 组件，并把它和store 关联起来

ReactDom.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
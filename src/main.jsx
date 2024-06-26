import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store/index.js'
import Modals from './components/Modals/index.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Modals/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
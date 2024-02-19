import { useState } from 'react'
import LoginContainer from './pages/Login/LoginContainer'
import CodeVerification from './pages/CodeVerification'
import Menu from './pages/Menu'
import './App.css'
import Affiliate from './components/Affiliate/Affiliate'
import Main from './pages/Main/Main'
import { Router } from 'react-router-dom'
import { Layout } from 'antd'
import Sider from './components/Sider/Sider';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import styles from './pages/Main/main.module.scss'

function App() {
  return (
      <div className='app'>
        <Layout className='layout'>
          <Sider />
          <Layout>
            <Header />
            <Content />
          </Layout>
        </Layout>
      </div>
  )
}

export default App

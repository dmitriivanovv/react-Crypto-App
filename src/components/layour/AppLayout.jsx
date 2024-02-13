import { Layout, Spin } from 'antd'
import React, { useContext } from 'react'
import CryptoContext from '../../context/cryptoContext'
import AppContent from './AppContent'
import AppHeader from './AppHeader'
import AppSider from './AppSider'

const AppLayout = () => {
  const { isLoading } = useContext(CryptoContext)


  if (isLoading) {
    return (
      <Spin fullscreen size='large' />
    )
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default AppLayout
import { Layout, Typography } from 'antd';
import React from 'react';
import { useCrypto } from '../../context/cryptoContext';
import AssetsTable from '../AssetsTable';
import PortfolioChart from '../PortfolioChart';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};
const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  const totalAmount = (
    assets
      .map((asset) => asset.amount * cryptoPriceMap[asset.id])
      .reduce((acc, value) => (acc += value), 0)
      .toFixed(2)
  )

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
        Portfolio: {''}
        {totalAmount} $

      </Typography.Title>

      <PortfolioChart/>
      <AssetsTable/>

    </Layout.Content>
  
  )
}

export default AppContent
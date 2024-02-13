import { Divider, Flex, Typography } from 'antd'
import React from 'react'

const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <>
      <Flex align='center' gap={20}>
        <img src={coin.icon} alt={coin.name} style={{ width: 50 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {withSymbol && `(${coin.symbol})`} {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
    </>
  )
}

export default CoinInfo
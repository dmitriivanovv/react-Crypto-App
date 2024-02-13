import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/cryptoContext';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoinInfoModal';


const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alightItems: 'center',
};

// hhrhrttggtrryt//

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  const handleSelect = (value) => {
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  };



  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 'calc(25% - 1.5rem)' }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.label}
              style={{ width: 20 }}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type='primary' onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        width={600}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>

    </Layout.Header>
  )
}

export default AppHeader
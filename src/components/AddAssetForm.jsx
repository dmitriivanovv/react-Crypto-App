import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Result,
  Select,
  Space
} from 'antd';
import React, { useRef, useState } from 'react';
import { useCrypto } from '../context/cryptoContext';
import CoinInfo from './CoinInfo';

const validateMessages = {
  reguired: '${label} is required',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

const AddAssetForm = ({ onClose }) => {

  const [form] = Form.useForm()
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef()


  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select Coin"
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
    )
  }

  function onFinish(values) {
    console.log(values)
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }

  function handleAmoundChange(value) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    })
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount * value).toFixed(2)
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2)
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >

      <CoinInfo coin={coin} />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder='Enter coin amount'
          style={{ width: '100%' }}
          onChange={handleAmoundChange}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber

          style={{ width: '100%' }}
          onChange={handlePriceChange}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime={{ format: 'HH:mm', }}
        // onChange={onChange} 
        // onOk={onOk} 
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddAssetForm
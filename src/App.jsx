
import React from 'react';
import AppLayout from './components/layour/AppLayout';
import { CryptoContextProvider } from './context/cryptoContext';


export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
  )
}

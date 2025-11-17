

import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)


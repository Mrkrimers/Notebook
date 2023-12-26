import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <BrowserRouter>

      <React.StrictMode>
        <App />
      </React.StrictMode>

    </BrowserRouter>
  </MantineProvider>
)

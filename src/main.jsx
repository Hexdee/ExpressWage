/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import WebRoutes from './routes/index.jsx';
import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider } from './context/dashboard-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '../src/components/ui/toaster';

import { NearContext, Wallet } from './wallets/near.js';
const wallet = new Wallet({ networkId: NetworkId });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NearContext.Provider value={{ wallet, signedAccountId: null }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <DashboardProvider>
            <WebRoutes />
            <Toaster />
          </DashboardProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </NearContext.Provider>
  </React.StrictMode>
);

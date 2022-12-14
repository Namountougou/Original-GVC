import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'antd/dist/antd.css';
import { AuthProvider } from './utilities/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App /> 
      </AuthProvider>
    </BrowserRouter>
  
  </React.StrictMode>
);


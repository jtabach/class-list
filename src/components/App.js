import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes.js';

const App = () => {
  return (
    <div style={{ padding: "0 12px", minWidth: "510px" }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 必要に応じてCSSをインポート

// ルート要素にAppコンポーネントをレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
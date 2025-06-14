import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// ✅ AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Initialize AOS globally (before rendering)
AOS.init({
  duration: 1000,  // Animation duration
  once: true,      // Only animate once
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    
  </BrowserRouter>
  
);

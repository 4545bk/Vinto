import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import YoutubeTask from './components/YoutubeTask';
 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
    <Routes>
       <Route path="/youtube-task" element={<YoutubeTask />} /> {/* Add this for the YouTube task page */}
       <Route path="/" element={<App />} /> 
 
    
      
      </Routes>
    </Router>
  </React.StrictMode>,
);

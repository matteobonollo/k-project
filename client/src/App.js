import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Footer from './components/Footer.jsx';
import Collection from './pages/Collection.jsx';
import './styles/App.css';

function App() {
  return (
    <Router>
    
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
    
    <Footer />
    
  </Router>
  );
}

export default App;

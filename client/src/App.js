import React from 'react';
import Header from './components/layout/Header';
import MainNavbar from './components/layout/MainNavbar';
import Footer from './components/layout/Footer';
import FrontPage from './components/layout/FrontPage';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.min.css';

const App = () => (
  <div class='main-container'>
    <Header />
    <div class='content'>
      <MainNavbar />
      <FrontPage />
    </div>
    <Footer />
  </div>
);

export default App;

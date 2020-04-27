import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Layout
import Header from './components/layout/Header';
import MainNavbar from './components/layout/MainNavbar';
import Footer from './components/layout/Footer';

// Pages
import FrontPage from './components/main/FrontPage';
import Cupcakes from './components/products/Cupcakes';
import Cakes from './components/products/Cakes';
import Cookies from './components/products/Cookies';
import Pies from './components/products/Pies';
import Pops from './components/products/Pops';
import Others from './components/products/Others';
import Gallery from './components/gallery/Gallery';
import ContactUs from './components/contact/ContactUs';
import AboutUs from './components/about/AboutUs';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.min.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Redirect exact from='/' to='main' />
      <div class='main-container'>
        <Header />
        <div class='content'>
          <MainNavbar />
          <Switch>
            <Route exact path='/main' component={FrontPage} />
            <Route exact path='/products/cupcakes' component={Cupcakes} />
            <Route exact path='/products/cakes' component={Cakes} />
            <Route exact path='/products/pies' component={Pies} />
            <Route exact path='/products/cookies' component={Cookies} />
            <Route exact path='/products/pops' component={Pops} />
            <Route exact path='/products/others' component={Others} />
            <Route path='/gallery/:id' component={Gallery} />
            <Route exact path='/contact' component={ContactUs} />
            <Route exact path='/about' component={AboutUs} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;

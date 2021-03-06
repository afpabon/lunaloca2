import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layout
import MainLoadingOverlay from './components/layout/MainLoadingOverlay';
import Header from './components/layout/Header';
import MainNavbar from './components/layout/MainNavbar';
import Footer from './components/layout/Footer';
import EnlargedImageModal from './components/layout/EnlargedImageModal';
import EditImageModal from './components/image/EditImageModal';
import QuotationModal from './components/quotation/QuotationModal';

// Admin
import Categories from './components/admin/Categories';
import QuotationBases from './components/admin/QuotationBases';
import PrivateRoute from './components/main/PrivateRoute';
import Register from './components/main/Register';
import Login from './components/main/Login';

// Pages
import FrontPage from './components/main/FrontPage';
import Products from './components/products/Products';
import Cupcakes from './components/products/Cupcakes';
import Cakes from './components/products/Cakes';
import Cookies from './components/products/Cookies';
import Pies from './components/products/Pies';
import Pops from './components/products/Pops';
import Others from './components/products/Others';
import Fondant from './components/glossary/Fondant';
import Ganache from './components/glossary/Ganache';
import Glase from './components/glossary/Glase';
import Gallery from './components/gallery/Gallery';
import ContactUs from './components/contact/ContactUs';
import AboutUs from './components/about/AboutUs';
import SearchResults from './components/gallery/SearchResults';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.min.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <MainLoadingOverlay>
        <EnlargedImageModal />
        <EditImageModal />
        <QuotationModal />
        <Router>
          {window.innerWidth < 768 && <MainNavbar />}
          <div className='main-container'>
            <Header />
            {window.innerWidth >= 768 && <MainNavbar />}
            <div className='content'>
              <Switch>
                <PrivateRoute
                  exact
                  path='/admin/categories'
                  component={Categories}
                />
                <PrivateRoute
                  exact
                  path='/admin/quotationbases'
                  component={QuotationBases}
                />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/products' component={Products} />
                <Route exact path='/products/cupcakes' component={Cupcakes} />
                <Route exact path='/products/cakes' component={Cakes} />
                <Route exact path='/products/pies' component={Pies} />
                <Route exact path='/products/cookies' component={Cookies} />
                <Route exact path='/products/pops' component={Pops} />
                <Route exact path='/products/others' component={Others} />
                <Route exact path='/glossary/fondant' component={Fondant} />
                <Route exact path='/glossary/ganache' component={Ganache} />
                <Route exact path='/glossary/glase' component={Glase} />
                <Route path='/gallery/:id' component={Gallery} />
                <Route exact path='/contact' component={ContactUs} />
                <Route exact path='/about' component={AboutUs} />
                <Route exact path='/search-results' component={SearchResults} />
                <Route path='/' component={FrontPage} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </MainLoadingOverlay>
    </Provider>
  );
};

export default App;

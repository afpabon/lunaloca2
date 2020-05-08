import _ from 'lodash';
import React, { useEffect } from 'react';
import { uuid } from 'uuidv4';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { loadCategories } from '../../actions/main';

const MainNavbar = ({ categories, loadCategories }) => {
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const { pathname } = useLocation();

  return (
    <Navbar bg='main' expand='lg' variant='main'>
      <Navbar.Toggle>
        <i className='fas fa-grip-lines toggle-dark'></i>
      </Navbar.Toggle>
      <Navbar.Collapse id='navbarText'>
        <Nav className='nav-fill w-100' as='ul'>
          <Nav.Item as='li' className={pathname === '/' ? 'active' : ''}>
            <Link to='/' className='nav-link'>
              Inicio
            </Link>
          </Nav.Item>
          <NavDropdown
            className={`nav-dropdown ${
              pathname.match(/^\/products\//g) ? 'active' : ''
            }`}
            title='Productos'
            id='products_toggle'
            as='li'
          >
            <Link
              to='/products/cupcakes'
              className={`dropdown-item ${
                pathname === '/products/cupcakes' ? 'active' : ''
              }`}
            >
              Cupcakes
            </Link>
            <Link
              to='/products/cakes'
              className={`dropdown-item ${
                pathname === '/products/cakes' ? 'active' : ''
              }`}
            >
              Tortas
            </Link>
            <Link
              to='/products/cookies'
              className={`dropdown-item ${
                pathname === '/products/cookies' ? 'active' : ''
              }`}
            >
              Galletas
            </Link>
            <Link
              to='/products/pies'
              className={`dropdown-item ${
                pathname === '/products/pies' ? 'active' : ''
              }`}
            >
              Pies
            </Link>
            <Link
              to='/products/pops'
              className={`dropdown-item ${
                pathname === '/products/pops' ? 'active' : ''
              }`}
            >
              Pops
            </Link>
            <Link
              to='/products/others'
              className={`dropdown-item ${
                pathname === '/products/others' ? 'active' : ''
              }`}
            >
              Otros
            </Link>
          </NavDropdown>
          <NavDropdown
            className={`nav-dropdown ${
              pathname.match(/^\/gallery\//g) ? 'active' : ''
            }`}
            title='Galería'
            id='gallery_toggle'
            as='li'
          >
            {_.map(categories, category => (
              <Link
                key={uuid()}
                to={`/gallery/${category.publicid}`}
                className={`dropdown-item ${
                  pathname === `/gallery/${category.publicid}` ? 'active' : ''
                }`}
              >
                {category.name}
              </Link>
            ))}
          </NavDropdown>
          <Nav.Item as='li' className={pathname === '/contact' ? 'active' : ''}>
            <Link to='/contact' className='nav-link'>
              Contacto
            </Link>
          </Nav.Item>
          <Nav.Item as='li' className={pathname === '/about' ? 'active' : ''}>
            <Link to='/about' className='nav-link'>
              Acerca de nosotros
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  categories: state.main.categories,
});

export default connect(
  mapStateToProps,
  { loadCategories },
)(MainNavbar);

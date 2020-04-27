import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <Navbar bg='main' expand='lg' variant='main'>
      <Navbar.Collapse id='navbarText'>
        <Nav className='nav-fill w-100' as='ul'>
          <Nav.Item as='li'>
            <Link to='/main' className='nav-link'>
              Inicio
            </Link>
          </Nav.Item>
          <NavDropdown
            className='nav-dropdown'
            title='Productos'
            id='products_toggle'
            as='li'
          >
            <Link to='/products/cupcakes' className='dropdown-item'>
              Cupcakes
            </Link>
            <Link to='/products/cakes' className='dropdown-item'>
              Tortas
            </Link>
            <Link to='/products/cookies' className='dropdown-item'>
              Galletas
            </Link>
            <Link to='/products/pies' className='dropdown-item'>
              Pies
            </Link>
            <Link to='/products/pops' className='dropdown-item'>
              Pops
            </Link>
            <Link to='/products/others' className='dropdown-item'>
              Otros
            </Link>
          </NavDropdown>
          <NavDropdown
            className='nav-dropdown'
            title='Galería'
            id='gallery_toggle'
            as='li'
          >
            <Link to='/gallery/cupcakes' className='dropdown-item'>
              Cupcakes
            </Link>
            <Link to='/gallery/cakes' className='dropdown-item'>
              Tortas
            </Link>
            <Link to='/gallery/others' className='dropdown-item'>
              Otros
            </Link>
          </NavDropdown>
          <Nav.Item as='li'>
            <Link to='/contact' className='nav-link'>
              Contacto
            </Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Link to='/about' className='nav-link'>
              Acerca de nosotros
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;

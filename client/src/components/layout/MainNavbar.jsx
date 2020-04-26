import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MainNavbar = () => {
  return (
    <Navbar bg='main' expand='lg' variant='main'>
      <Navbar.Collapse id='navbarText'>
        <Nav className='nav-fill w-100' as='ul'>
          <Nav.Item as='li'>
            <Nav.Link href='index.html'>Inicio</Nav.Link>
          </Nav.Item>
          <NavDropdown
            className='nav-dropdown'
            title='Productos'
            id='products_toggle'
            as='li'
          >
            <NavDropdown.Item href='products/cupcakes.html'>
              Cupcakes
            </NavDropdown.Item>
            <NavDropdown.Item href='products/cakes.html'>
              Tortas
            </NavDropdown.Item>
            <NavDropdown.Item href='products/cookies.html'>
              Galletas
            </NavDropdown.Item>
            <NavDropdown.Item href='products/pies.html'>Pies</NavDropdown.Item>
            <NavDropdown.Item href='products/pops.html'>Pops</NavDropdown.Item>
            <NavDropdown.Item href='products/others.html'>
              Otros
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className='nav-dropdown'
            title='Galería'
            id='gallery_toggle'
            as='li'
          >
            <NavDropdown.Item href='gallery/cupcakes.html'>
              Cupcakes
            </NavDropdown.Item>
            <NavDropdown.Item href='gallery/cakes.html'>
              Tortas
            </NavDropdown.Item>
            <NavDropdown.Item href='gallery/others.html'>
              Otros
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Item as='li'>
            <Nav.Link href='contact.html'>Contacto</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='about.html'>Acerca de nosotros</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

/*

    <nav className='navbar navbar-expand-lg navbar-main bg-main'>
      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav nav-fill w-100'>
          <li className='nav-item active'>
            <a className='nav-link' href='index.html'>
              Inicio
            </a>
          </li>
          <li className='nav-item dropdown'>
            <a
              href={null}
              className='nav-link dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
              id='products_toggle'
            >
              Productos
            </a>
            <ul
              className='dropdown-menu dropdown-main'
              aria-labelledby='products_toggle'
            >
              <li className='nav-item'>
                <a className='nav-link' href='products/cupcakes.html'>
                  Cupcakes
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='products/cakes.html'>
                  Tortas
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='products/cookies.html'>
                  Galletas
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='products/pies.html'>
                  Pies
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='products/pops.html'>
                  Pops
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='products/others.html'>
                  Otros
                </a>
              </li>
            </ul>
          </li>
          <li className='nav-item dropdown'>
            <a
              href={null}
              className='nav-link dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
              id='gallery_toggle'
            >
              Galería
            </a>
            <ul
              className='dropdown-menu dropdown-main'
              aria-labelledby='gallery_toggle'
            >
              <li className='nav-item'>
                <a className='nav-link' href='gallery/cupcakes.html'>
                  Cupcakes
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='gallery/cakes.html'>
                  Tortas
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='gallery/others.html'>
                  Otros
                </a>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='contact.html'>
              Contacto
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='about.html'>
              Acerca de nosotros
            </a>
          </li>
        </ul>
      </div>
    </nav>

*/

export default MainNavbar;

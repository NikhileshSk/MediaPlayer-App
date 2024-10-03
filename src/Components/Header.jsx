import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Navbar className="bg-dark custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <img
                alt="logo"
                src="https://cdn-icons-png.flaticon.com/512/888/888881.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '18px' }}>
                Media Player
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Link to="./Home" className="nav-link">Videos</Link>
              <Link to="/audios" className="nav-link">Audios</Link>
              <Link to="./watch-history" className="nav-link">History</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style jsx>{`
        .custom-navbar {
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(58, 58, 58, 0.8));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .nav-link {
          color: #f8f9fa;
          margin-left: 20px;
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #007bff;
        }

        @media (max-width: 992px) {
          .nav-link {
            margin-left: 0;
            margin-bottom: 10px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;

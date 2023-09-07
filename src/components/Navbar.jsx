// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="navbar-button">Planets</button>
          <ul className="navbar-submenu">
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/earth">Earth</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/mars">Mars</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/jupiter">Jupiter</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/saturn">Saturn</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/uranus">Uranus</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/neptune">Neptune</Link>
            </li>
            {/* Add more links for other planets */}
          </ul>
        </li>
        <li className="navbar-item">
          <button className="navbar-button">Ships</button>
          <ul className="navbar-submenu">
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/voyager1">Voyager 1</Link>
            </li>
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/internationalSpaceStation">ISS</Link>
            </li>
            
            {/* Add more spacecraft options here */}
          </ul>
        </li>
        <li className="navbar-item">
          <button className="navbar-button">Rovers</button>
          <ul className="navbar-submenu">
            <li className="navbar-submenu-item">
              <Link to="/celestialBody/marsRover">mars Rover</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

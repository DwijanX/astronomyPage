// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar"> {/* Apply the 'navbar' class */}
      <ul>
        <li><Link to="/planet/earth">Earth</Link></li>
        <li><Link to="/planet/mars">Mars</Link></li>
        <li><Link to="/planet/jupiter">Jupiter</Link></li>
        <li><Link to="/planet/saturn">Saturn</Link></li>
        <li><Link to="/planet/uranus">Uranus</Link></li>
        <li><Link to="/planet/neptune">Neptune</Link></li>
        {/* Add more links for other planets */}
      </ul>
    </nav>
  );
}

export default Navbar;
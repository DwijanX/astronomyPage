// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar"> {/* Apply the 'navbar' class */}
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;

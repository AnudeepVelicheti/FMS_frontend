import React from 'react';

function Navbar({onLogout }) {
  return (
    <nav className="navbar">
        <button className="logout-button" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;

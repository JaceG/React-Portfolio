import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Developer Name</h1>
      <nav>
        <NavLink to="/" activeClassName="active" end>About Me</NavLink>
        <NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        <NavLink to="/resume" activeClassName="active">Resume</NavLink>
      </nav>
    </header>
  );
}

export default Header;

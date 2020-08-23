import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {AuthContext} from  '../../Context/context';
import './NavLinks.css';

const NavLinks = props => {

  const auth = useContext(AuthContext);
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
   {auth.IsloggedIn &&( <li>
      <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
    </li>)}
   
   {auth.IsloggedIn && ( <li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>)}
    {!auth.IsloggedIn && (<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>)}
    {auth.IsloggedIn && (<li>
      <button onClick={auth.logout}>Logout</button>
    </li>)}
  </ul>
};

export default NavLinks; 
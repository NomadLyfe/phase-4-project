import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/menu-masters-ogo-transparent.png";
import "../css files/navbar.css"

function NavBar({ user, setUser }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((resp) => {
            if (resp.ok) {
                setUser(null);
            }
        });
    }
    return (
        <div className="navbar">
            <img src={logo} alt='logo' className='navLogo' />
            <nav>
                
                <NavLink to='/' >Home</NavLink>
                {!user ? <NavLink to="/login" >Login</NavLink> : null}
                {user ? <Link to="/" onClick={handleLogoutClick} >Log Out</Link> : null}
                {!user ? <NavLink to='/signup'>Signup</NavLink> : null}
            </nav>
        </div>
  );
}

export default NavBar
import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user, setUser }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((resp) => {
            if (resp.ok) {
                setUser(null);
            }
        });
    }
    return (
        <nav>
            {!user ? <NavLink to="/login">Login</NavLink> : null}
            {user ? <Link to="/" onClick={handleLogoutClick}>Log Out</Link> : null}
            
        </nav>
  );
}

export default NavBar
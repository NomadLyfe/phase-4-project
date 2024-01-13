import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/menu-masters-ogo-transparent.png";
import "../css files/footer.css";

function Footer({ user }) {
    const currentdate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const datetime = currentdate.getDate() + " "
                + monthNames[currentdate.getMonth()]  + " " 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-more">
                    <div className="footer-links">
                        <Link to='/'>Home</Link>
                        {!user ? <Link to='login'>Login</Link> : null}
                        {!user ? <Link to='/signup'>Sign up</Link> : null}
                        {user ? <Link to='/account'>Account</Link> : null}
                        {user ? <Link to='/logout'>Logout</Link> : null}
                        <Link to='/'>Contact Us</Link>
                    </div>
                    <div className="footer-info">
                        <p>By using this site, you agree to the Terms of Use and Privacy Policy. Menu Masters ® is a registered trademark of the Jerry Foundation, Inc., a non-profit organization.</p>
                        <p>This page was last edited on {datetime} (EST).</p>
                        <p>© 2023 Menu Masters. All rights reserved.</p>
                    </div>
                    <NavLink to='/' className='logoLink' ><img src={logo} alt='logo' /></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Footer;

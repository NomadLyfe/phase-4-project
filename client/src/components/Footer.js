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
                <div className="footer-logo">
                    <NavLink to='/' className='logoLink' ><img src={logo} alt='logo' /></NavLink>
                </div>
                <div className="footer-more">
                    <div className="footer-links">
                        <Link to='/' className='footer-links'>Home</Link>
                        {!user ? <Link to='login' className='footer-links'>Login</Link> : null}
                        {!user ? <Link to='/signup' className='footer-links'>Sign up</Link> : null}
                        {user ? <Link to='/account' className='footer-links'>Account</Link> : null}
                        {user ? <Link to='/logout' className='footer-links'>Logout</Link> : null}
                        <Link to='/' className='footer-links'>Contact Us</Link>
                    </div>
                    <div className="footer-info">
                        <p>By using this site, you agree to the Terms of Use and Privacy Policy. Menu Masters ® is a registered trademark of the Jerry Foundation, Inc., a non-profit organization.</p>
                        <p>This page was last edited on {datetime} (EST).</p>
                        <p>© 2023 Menu Masters. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

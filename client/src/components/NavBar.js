import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../images/menu-masters-ogo-transparent.png";
import "../css files/navbar.css"

function NavBar({ user, onLogout, history, onSearch }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((resp) => {
            if (resp.ok) {
                onLogout(null);
            }
        });
    }

    const formSchema = yup.object().shape({
        restaurant: yup.string(),
        location: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            restaurant: "",
            location: "",
            offset: 0
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/results`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then(resp => resp.json()).then(restaurants => {
                history.push(`/results/${values.restaurant}/${values.location}`)
                onSearch(restaurants.businesses)
            })
            formik.resetForm();
        }
    });

    return (
        <nav>
            <NavLink to='/' className='logoLink' ><img src={logo} alt='logo' /></NavLink>
            <form onSubmit={formik.handleSubmit}>
                <input type='text'name="restaurant" value={formik.values.restaurant} onChange={formik.handleChange} placeholder='Restaurant...' />
                <input type='text'name="location" value={formik.values.location} onChange={formik.handleChange} placeholder='Location...' />
                <button type="submit">Search</button>
            </form>
            {!user ? <NavLink to="/login" className='link' >Login</NavLink> : null}
            {!user ? <NavLink to='/signup' className='link' >Signup</NavLink> : null}
            {user ? <Link to="/account" className='link' >Account</Link> : null}
            {user ? <button onClick={handleLogoutClick} className='link' >Log Out</button> : null}
        </nav>
  );
}

export default NavBar
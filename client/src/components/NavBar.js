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
            location: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${values.location}&term=${values.restaurant}&categories=restaurant&sort_by=best_match&limit=20`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer kBmLOigA37g8LBZPX2Lm60qZA-y7zd_b5cvfN-h4rK9AsO-X5i8PaTcbkmbvYJsq3YOMuwigVXgU8-PQSJipSfU4LP70_j4V8K0BKGAlXcHbs7iM04XZrn7fd3hJZXYx'
                }
            })
            .then(resp => resp.json())
            .then(restaurants => {
                history.push('/results')
                onSearch(restaurants.businesses)
            })
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
            {user ? <Link to="/" className='link' >Account</Link> : null}
            {user ? <Link to="/" onClick={handleLogoutClick} className='link' >Log Out</Link> : null}
        </nav>
  );
}

export default NavBar
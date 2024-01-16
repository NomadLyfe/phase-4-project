import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from '../images/menu-masters-ogo-transparent.png';

function Login({ onLogin, user, history, prevPath, setPrevPath, setCurrPath, currPath }) {
    useEffect(() => {
        setPrevPath(currPath);
        setCurrPath(history.location.pathname);
    }, [])

    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username').max(20),
        password: yup.string().required('Must enter password').max(20)
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        if (prevPath === '/signup') {
                            history.go(-2);
                        } else {
                            history.goBack();
                        }
                        alert('Congratulations! You are logged in!');
                        onLogin(user);
                    });
                } else {
                    alert("You've entered the wrong username or password.\n\nPlease try again.")
                }
            });
            formik.resetForm();
        }
    });

    return (
        <div className="form">
            {!user ? <form onSubmit={formik.handleSubmit} className='loginform'>
				<label id='username' for='usernameinp'>Username</label>
				<input type='text' id='usernameinp' name='username' autoComplete="on" onChange={formik.handleChange} value={formik.values.username} />
				<br />
				<label id='password' for='passwordinp'>Password</label>
				<input type='password' id='passwordinp' name='password' onChange={formik.handleChange} value={formik.values.password} />
				<br />
				<button type='submit'>Log In</button>
                <br />
                <Link to='/signup'>Don't have an account? Click here to make one!</Link>
			</form> : <img className="loading-logo" src={logo} />}
        </div>
    );
};

export default Login;

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from '../images/menu-masters-ogo-transparent.png';

function Signup({ onLogin, user, history, prevPath, setPrevPath, setCurrPath, currPath }) {
    useEffect(() => {
        setPrevPath(currPath);
        setCurrPath(history.location.pathname);
    }, [])
    
    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username').max(20),
        password: yup.string().required('Must enter password').max(20),
        passwordConfirmation: yup.string('Must enter matching password').max(20),
        email: yup.string().email('Must enter email').max(50)
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordConfirmation: "",
            email: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            if (values.password === values.passwordConfirmation) {
                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values, null, 2)
                }).then((resp) => {
                    if (resp.ok) {
                        resp.json().then((user) => {
                            if (prevPath === '/login') {
                                history.go(-2);
                            } else {
                                history.goBack();
                            }
                            alert('Congratulations! You are logged in!');
                            onLogin(user);
                        });
                    } else {
                        alert('\nThat username already exists.\n\nPlease try a different username.');
                    }
                });
            } else {
                alert('\nYour passwords do not match.\n\nPlease try again.');
            }
            formik.resetForm();
        }
    });

    return (
        <div className="form">
            {!user ? <form onSubmit={formik.handleSubmit} className='loginform'>
				<label id='username' for='usernameinp'>Create a username: </label>
				<input id='usernameinp' type='text' name='username' onChange={formik.handleChange} value={formik.values.username} />
				<br />
				<label id='password' for='passwordinp'>Create a password: </label>
				<input id='passwordinp' type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
				<br />
                <label id='password' for='passwordconfinp'>Re-enter your password: </label>
				<input id='passwordconfinp' type='password' name='passwordConfirmation' onChange={formik.handleChange} value={formik.values.passwordConfirmation} />
                <br />
                <label id='email' for='emailinp'>Provide a valid E-mail: </label>
				<input id='emailinp' type='text' name='email' onChange={formik.handleChange} value={formik.values.email} />
                <br />
				<button type='submit'>Sign Up</button>
			</form> : <img className="loading-logo" src={logo} />}
        </div>
    );
};

export default Signup;
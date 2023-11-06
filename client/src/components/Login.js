import { useFormik } from "formik";
import * as yup from "yup";

function Login({ onLogin, user }) {
    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username').max(20),
        password: yup.string().required('Must enter password').max(20)
    })

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
                    resp.json().then((user) => onLogin(user));
                }
            });
        }
    })

    return (
        <div className="form">
            {!user ? <form onSubmit={formik.handleSubmit} className='loginform'>
				<label id='username'>Username</label>
				<input type='text' name='username' onChange={formik.handleChange} value={formik.values.username} />
				<br />
				<label id='password'>Password</label>
				<input type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
				<br />
				<button type='submit'>Log In</button>
			</form> : <p>Congratulations! You are logged in!</p>}
        </div>
    );
}

export default Login;

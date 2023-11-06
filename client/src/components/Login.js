import { useFormik } from "formik";
import * as yup from "yup";

function Login({ onLogin }) {
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
                throw resp;
            });
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='loginform'>
				<label id='username'>Username</label>
				<input type='text' onChange={formik.handleChange} value={formik.values.username} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={formik.handleChange} value={formik.values.password} />
				<br />
				<button>Log In</button>
			</form>
        </div>
    );
}

export default Login;

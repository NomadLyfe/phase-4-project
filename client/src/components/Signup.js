import { useFormik } from "formik";
import * as yup from "yup";

function Signup({ onLogin }) {
    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username').max(20),
        password: yup.string().required('Must enter password').max(20),
        passwordConfirmation: yup.string('Must enter matching password').max(20)
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordConfirmation: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            if (formik.values.password === formik.values.passwordConfirmation) {
                fetch('/signup', {
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
            } else {
                alert('\nYour passwords do not match!')
            }
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='loginform'>
				<label id='username'>Create a username: </label>
				<input type='text' name='username' onChange={formik.handleChange} value={formik.values.username} />
				<br />
				<label id='password'>Create a password: </label>
				<input type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
				<br />
                <label id='password'>Re-enter your password: </label>
				<input type='password' name='passwordConfirmation' onChange={formik.handleChange} value={formik.values.passwordConfirmation} />
                <br />
				<button>Log In</button>
			</form>
        </div>
    );
}

export default Signup;
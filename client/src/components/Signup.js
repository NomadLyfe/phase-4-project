import React, { useState } from "react";

function Signup({ onLogin }) {
    const [signupData, setSignupData] = useState({'username': null, 'password': null, 'passwordConfirmation': null})

    function handleChange(e) {
        setSignupData({...signupData, [e.target.previousSibling.id]: e.target.vlaue});
    }

    function handleSubmit(e) {
        e.preventdefault();
        if (signupData.password === signupData.passwordConfirmation) {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': signupData.username, 'password': signupData.password})
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

    return (
        <div>
            <form onSubmit={handleSubmit} className='loginform'>
				<label id='username'>Create a username: </label>
				<input type='text' name='username' onChange={handleChange} value={signupData.username} />
				<br />
				<label id='password'>Create a password: </label>
				<input type='password' name='password' onChange={handleChange} value={signupData.password} />
				<br />
                <label id='password'>Re-enter your password: </label>
				<input type='password' name='passwordConfirmation' onChange={handleChange} value={signupData.passwordConfirmation} />
                <br />
				<button>Log In</button>
			</form>
        </div>
    );
}

export default Signup;
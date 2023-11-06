import React, { useState } from "react";

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({'username': null, 'password': null})

    function handleChange(e) {
        setLoginData({...loginData, [e.target.previousSibling.id]: e.target.vlaue});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': loginData.username, 'password': loginData.password})
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => onLogin(user));
            }
            throw resp;
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='loginform'>
				<label id='username'>Username</label>
				<input type='text' onChange={handleChange} value={loginData.username} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={handleChange} value={loginData.password} />
				<br />
				<button>Log In</button>
			</form>
        </div>
    );
}

export default Login;

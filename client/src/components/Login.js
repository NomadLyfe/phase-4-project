import React, { useState } from "react";

function Login({ handleSubmit, user  }) {
    const [loginData, setLoginData] = useState({'username': null, 'password': null})

    function handleChange(e) {
        setLoginData({...loginData, [e.target.previousSibling.id]: e.target.vlaue});
    }

    return (
        <div>
            {!user ? <form onSubmit={handleSubmit} className='loginform'>
				<label id='username'>Username</label>
				<input type='text' onChange={handleChange} value={loginData.id} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={handleChange} value={loginData.password} />
				<br />
				<button>Log In</button>
			</form> : <p>Congratulations! You are logged in!</p>}
        </div>
    );
}

export default Login;

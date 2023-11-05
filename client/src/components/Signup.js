import React, { useState } from "react";

function Signup({ handleSubmit, user  }) {
    const [loginData, setLoginData] = useState({'username': null, 'password': null})

    function handleChange(e) {
        setLoginData({...loginData, [e.target.previousSibling.id]: e.target.vlaue});
    }

    return (
        <div>
            {!user ? <form onSubmit={handleSubmit} className='loginform'>
				<label id='username'>Create a username: </label>
				<input type='text' onChange={handleChange} value={loginData.id} />
				<br />
				<label id='password'>Create a password: </label>
				<input type='password' onChange={handleChange} value={loginData.password} />
				<br />
                <label id='password'>Re-enter your password: </label>
				<input type='password' onChange={handleChange} value={loginData.password} />
                <br />
				<button>Log In</button>
			</form> : <p>Congratulations! You are logged in!</p>}
        </div>
    );
}

export default Signup;
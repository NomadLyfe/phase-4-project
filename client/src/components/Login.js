import React, { useEffect, useState } from "react";

function Login() {
    return (
        <div>
            {!user ? <form onSubmit={handleSubmit} className='loginform'>
				<label id='id'>Username</label>
				<input type='text' onChange={handleChange} value={logindata.id} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={handleChange} value={logindata.password} />
				<br />
				<button>Log In</button>
			</form>: <p>Congratulations! You are logged in!</p>}
        </div>
    );
}

export default Login;

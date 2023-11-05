import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/check_session').then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
            throw r
        });
    }, []);

    function handleLogin(e) {
        e.preventDefault();
        fetch()
    }

    return (
        <>
            <NavBar user={user} />
            <main>
                <Switch>
                    <Route exact path='/login'>
                        <Login handleSubmit={handleLogin} handleChange={} user={user} />
                    </Route>
                </Switch>
            </main>
        </>
    );
}

export default App;

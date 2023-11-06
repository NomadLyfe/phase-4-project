import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/check_session').then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
            throw resp;
        });
    }, []);

    return (
        <>
            <NavBar user={user} />
            <main>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/login'>
                        <Login onLogin={setUser} />
                    </Route>
                    <Route exact path='/signup'>
                        <Signup user={user} />
                    </Route>
                </Switch>
            </main>
        </>
    );
}

export default App;

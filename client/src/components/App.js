import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import '../css files/app.css'

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('/check_session').then((resp) => {
            if (resp.status === 200) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, []);

    return (
        <>
            <NavBar user={user} onLogout={setUser} />
            <main>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/login'>
                        <Login onLogin={setUser} user={user} />
                    </Route>
                    <Route exact path='/signup'>
                        <Signup onLogin={setUser} user={user} />
                    </Route>
                    <Route>
                        
                    </Route>
                </Switch>
            </main>
        </>
    );
}

export default App;

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
        });
    }, []);

    return (
        <>
            <NavBar user={user} />
            <main>
                <Switch>
                    <Route>

                    </Route>
                </Switch>
            </main>
        </>
    );
}

export default App;

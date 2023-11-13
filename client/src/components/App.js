import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Results from "./Results";
import Footer from "./Footer";
import NewReview from "./NewReview";
import Reviews from "./Reviews";
import '../css files/app.css'

function App() {
    const [user, setUser] = useState(null);
    const [results, setResults] = useState(null)
    const history = useHistory();

    useEffect(() => {
        fetch('/check_session').then((resp) => {
            if (resp.status === 200) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, []);

    return (
        <>
            <NavBar user={user} onLogout={setUser} history={history} onSearch={setResults} />
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
                    <Route path={'/results/:queryParam/:locationParam'}>
                        <Results results={results} history={history} onSearch={setResults} />
                    </Route>
                    <Route exact path='/newreview'>
                        <NewReview />
                    </Route>
                    <Route exact path='/reviews/:restaurantName'>
                        <Reviews />
                    </Route>
                </Switch>
                <Footer />
            </main>
        </>
    );
}

export default App;

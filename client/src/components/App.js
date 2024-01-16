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
import AccountInfo from "./AccountInfo";
import '../css files/app.css'

function App() {
    const [user, setUser] = useState(null);
    const [results, setResults] = useState(null);
    const history = useHistory();
    const [prevPath, setPrevPath] = useState(null);
    const [currPath, setCurrPath] = useState(history.location.pathname)

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
                        <Home history={history} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route exact path='/login'>
                        <Login onLogin={setUser} user={user} history={history} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route exact path='/signup'>
                        <Signup onLogin={setUser} user={user} history={history} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route path={'/results/:queryParam/:locationParam'}>
                        <Results results={results} history={history} onSearch={setResults} user={user} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route exact path='/:restaurantName/:address/newreview'>
                        <NewReview history={history} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route exact path='/:restaurantName/:address/reviews'>
                        <Reviews history={history} user={user} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                    <Route exact path='/account'>
                        <AccountInfo user={user} setUser={setUser} history={history} currPath={currPath} prevPath={prevPath} setPrevPath={setPrevPath} setCurrPath={setCurrPath} />
                    </Route>
                </Switch>
                <Footer user={user} />
            </main>
        </>
    );
};

export default App;

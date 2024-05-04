import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { LeftBar, Feed, Home, Navbar } from "./exports";
// import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app flex flex-col h-screen w-full">
      <Navbar />
      <LeftBar />
      <div className="content flex-grow">
        {isLoaded && (
          <Switch>
            <Route exact path="/components/:componentID">
              <Feed />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;

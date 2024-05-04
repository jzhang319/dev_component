import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { LeftBar, Feed, Home, Navbar, ChatBar } from "./exports";
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
      <LeftBar className="h-screen" />
      <ChatBar />
      <div
        className="content h-screen overflow-auto mt-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollbarColor: "transparent transparent",
        }}
      >
        {isLoaded && (
          <Switch>
            <Route exact path="/components/:componentID">
              <div className="w-3/5 h-full flex flex-col justify-center items-center mx-auto">
                {/* <Feed /> */}
              </div>
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

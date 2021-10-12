import React from "react";
import { Switch, Route } from "react-router-dom";
import Work from "./work";
import Home from "./home";

function App() {
    console.log('run app.js');
    return (
        <Switch>
            <Route exact path='/To-Do/'>
                <Home />
            </Route>
            <Route path='/To-Do/work'>
                <Work />
            </Route>
        </Switch>
    )

}
export default App;
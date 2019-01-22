import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { render } from "react-dom";
import Home from "Home"


const rootEl = document.getElementById("app");

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


render(<App />, rootEl);

if (module.hot) {
  module.hot.accept();
}

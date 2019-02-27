import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { render } from "react-dom";
import Home from "Home";
import AFrameHome from "AFrameHome";
import Info from "Info";


const rootEl = document.getElementById("app");

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/aframe" component={AFrameHome} />
                        <Route path="/info" component={Info} />
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

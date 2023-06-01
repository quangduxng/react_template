/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */

import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Pages from "./views/Pages/Pages";
import './styles.scss';
import routes from "./routes";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Router
          basename={process.env.REACT_APP_BASENAME || ""}
          history={browserHistory}
        >
          <Switch>
          {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={(props) => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  }}
                />
              );
            })}
            <Route Redirect to="/PageNotFound" exact component={Pages} />
          </Switch>
        </Router>
    );
  }
}

export default App;

export const browserHistory = createBrowserHistory();

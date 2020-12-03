import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import routes2 from "./routes2";
import { map } from "lodash";

const Navigation = ({ auth }) => {
  return (
    <Router>
      <Switch>
        {auth &&
          map(routes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <route.layout>
                  <route.component {...props} />
                </route.layout>
              )}
            />
          ))}

        {!auth &&
          map(routes2, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <route.layout>
                  <route.component {...props} />
                </route.layout>
              )}
            />
          ))}
      </Switch>
    </Router>
  );
};

export default Navigation;

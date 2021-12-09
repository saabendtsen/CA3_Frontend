import "../css/style2.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import HomeNested from "./HomeNested";
import AdminManger from "./AdminManager";
import ItemSearch from "./ItemSearch";
import WatchLater from "./WatchLater";

export default function Nesting(props) {
  let userrole = props.userrole;
  console.log(userrole);
  return (
    <Router>
      <div>
        <Header userrole={userrole} />
        <div className="content">
          <Switch>
            {userrole === "admin" && (
              <Route path="/">
                <AdminManger />
              </Route>
            )}
            {userrole === "user" && (
              <Route exact path="/">
                <HomeNested />
              </Route>
            )}
            {userrole === "user" && (
              <Route exact path="/search">
                <ItemSearch />
              </Route>
            )}
            {userrole === "user" && (
              <Route exact path="/watchlist">
                <WatchLater />
              </Route>
            )}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = (props) => {
  let userrole = props.userrole;
  return (
    <ul className="header">
      {userrole === "user" && (
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
      )}
      {userrole === "user" && (
        <li>
          <NavLink exact activeClassName="selected" to="/search">
            Movie/Series Search
          </NavLink>
        </li>
      )}
      {userrole === "user" && (
        <li>
          <NavLink exact activeClassName="selected" to="/watchlist">
            Your Watch List
          </NavLink>
        </li>
      )}
      {userrole === "admin" && (
        <li>
          <NavLink activeClassName="selected" to="/">
            Change user details
          </NavLink>
        </li>
      )}
    </ul>
  );
};

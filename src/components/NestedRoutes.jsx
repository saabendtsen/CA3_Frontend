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
  return (
    <Router>
      <div>
        <Header userrole={userrole} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <HomeNested />
            </Route>
            <Route exact path="/search">
              <ItemSearch />
            </Route>
            <Route exact path="/watchlist">
              <WatchLater />
            </Route>
            {userrole === "admin" && (
              <Route path="/admin">
                <AdminManger />
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
      <li>
        <NavLink exact activeClassName="selected" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/search">
          Movie/Series Search
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/watchlist">
          Your Watch List
        </NavLink>
      </li>
      {userrole === "admin" && (
        <li>
          <NavLink activeClassName="selected" to="/admin">
            Admin
          </NavLink>
        </li>
      )}
    </ul>
  );
};

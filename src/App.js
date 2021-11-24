import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import facade from "./apiFacade";
import Nesting from "./components/NestedRoutes";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <Form onChange={onChange}>
        <Row className="align-items-center">
          <Col></Col>
          <Col xs="auto">
            <h1>Semester Project (CA3) - Login page</h1>
          </Col>
          <Col></Col>
        </Row>
        <Row className="align-items-center">
          <Col></Col>
          <Col xs="auto">
            <Form.Label>Username</Form.Label>
            <Form.Control id="username" placeholder="Username" />
          </Col>
          <Col xs="auto">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
            />
          </Col>
          <Col></Col>
        </Row>
        <Row className="align-items-center">
          <Col></Col>
          <Col xs="auto">
            <Card.Body>
              <Button onClick={performLogin} variant="primary" size="lg">
                Login
              </Button>
            </Card.Body>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData().then((data) => setDataFromServer(data.msg));
  }, []);

  let token = jwt_decode(facade.getToken());

  return (
    <div>
      <Nesting userrole={token.roles} />
      {console.log(dataFromServer)}
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />

          <Card.Body></Card.Body>

          <Card.Footer className="text-muted">
            <Row>
              <Col>CA3 - Semester Project</Col>
              <Col></Col>
              <Col xs="auto">
                <Button onClick={logout} variant="danger" size="sm">
                  Logout
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </div>
      )}
    </div>
  );
}
export default App;

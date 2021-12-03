import React, { useState } from "react";
import * as All from "react-bootstrap";
import { MovieTitle, MovieWatchLater, MovieLikes } from "./Urls";
import facade from "../apiFacade";

function ItemSearch() {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [item, setItem] = useState([]);
  const [movieName, setMovieName] = useState();
  const [confirmation, setConfirmed] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoadingScreen(true);
    getsearchdata();
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    addToWatchList(evt);
  };

  const handleLike = (evt) => {
    evt.preventDefault();
    addLike(evt);
  };

  const onNameChange = (evt) => {
    setMovieName({ ...movieName, [evt.target.id]: evt.target.value });
  };

  function getsearchdata() {
    if (movieName != null) {
      setDataReady(false);
      fetch(MovieTitle + movieName.SearchItem)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          result.map((arr) => {
            return setItem((data) => [
              ...data,
              {
                id: arr.id,
                movieName: arr.movieName,
                placersToWatch: arr.placersToWatch,
                year: arr.year,

                poster: arr.poster,
                genre: arr.genre,
                rated: arr.rated,
                runtime: arr.runtime,
                imdbRating: arr.imdbRating,
                boxOffices: arr.boxOffices,
              },
            ]);
          });
          setLoadingScreen(false);
          setDataReady(true);
        })
        .catch((error) => {
          setError(error);
          setLoadingScreen(false);
          setDataReady(false);
        });
    } else {
      setError(null);
      setLoadingScreen(false);
      setDataReady(false);
    }
  }

  function addToWatchList(evt) {
    if (evt.target.value != null) {
      const options = facade.makeOptions("POST", true);
      fetch(MovieWatchLater + evt.target.value, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((error) => {
          setError(error);
        });
      setConfirmed("Added to your list!");
    } else {
      setError("No IMDB ID added yet!");
    }
  }

  function addLike(evt) {
    if (evt.target.value != null) {
      const options = facade.makeOptions("POST", true);
      fetch(MovieLikes + evt.target.value, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("No Movie Liked yet!");
    }
  }

  if (loadingScreen) {
    return (
      <>
        <div>
          <All.Card.Header className="text-center">
            <h1>
              Loading...
              <All.Spinner animation="border" />
            </h1>
          </All.Card.Header>
        </div>
      </>
    );
  } else if (isDataReady && !loadingScreen) {
    return (
      <div>
        <All.Accordion>
          <All.Container fluid>
            <All.Row>
              <hr />
              <All.Col>
                {item[0] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[0].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={0}>
                      <All.Accordion.Header>
                        <All.Image src={item[0].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          Watch it on:{" "}
                          <span>{item[0].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[0].year}</p>
                        {item[0].rated !== "N/A" && (
                          <p>{"Rated: " + item[0].rated}</p>
                        )}
                        {item[0].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[0].runtime}</p>
                        )}
                        {item[0].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[0].imdbRating}</p>
                        )}
                        {item[0].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[0].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[0].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[0].id}
                          value={item[0].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[0].id}
                          value={item[0].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
              <All.Col>
                {item[1] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[1].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={1}>
                      <All.Accordion.Header>
                        <All.Image src={item[1].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          {error != null && (
                            <All.Toast
                              className="d-inline-block m-1"
                              bg="danger"
                            >
                              <All.Toast.Body>
                                <strong className="me-auto">
                                  Player not found or account doesn't have Apex
                                  registered, Please try again
                                </strong>
                              </All.Toast.Body>
                            </All.Toast>
                          )}
                          Watch it on:{" "}
                          <span>{item[1].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[1].year}</p>
                        {item[1].rated !== "N/A" && (
                          <p>{"Rated: " + item[1].rated}</p>
                        )}
                        {item[1].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[1].runtime}</p>
                        )}
                        {item[1].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[1].imdbRating}</p>
                        )}
                        {item[1].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[1].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[1].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[1].id}
                          value={item[1].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[1].id}
                          value={item[1].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
              <All.Col>
                {item[2] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[2].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={2}>
                      <All.Accordion.Header>
                        <All.Image src={item[2].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          Watch it on:{" "}
                          <span>{item[2].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[2].year}</p>
                        {item[2].rated !== "N/A" && (
                          <p>{"Rated: " + item[2].rated}</p>
                        )}
                        {item[2].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[2].runtime}</p>
                        )}
                        {item[2].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[2].imdbRating}</p>
                        )}
                        {item[2].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[2].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[2].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[2].id}
                          value={item[2].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[2].id}
                          value={item[2].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
            </All.Row>
            <hr />
            <All.Row>
              <All.Col>
                {item[3] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[3].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={3}>
                      <All.Accordion.Header>
                        <All.Image src={item[3].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          Watch it on:{" "}
                          <span>{item[3].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[3].year}</p>
                        {item[3].rated !== "N/A" && (
                          <p>{"Rated: " + item[3].rated}</p>
                        )}
                        {item[3].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[3].runtime}</p>
                        )}
                        {item[3].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[3].imdbRating}</p>
                        )}
                        {item[3].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[3].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[3].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[3].id}
                          value={item[3].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[3].id}
                          value={item[3].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
              <All.Col>
                {item[4] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[4].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={4}>
                      <All.Accordion.Header>
                        <All.Image src={item[4].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          Watch it on:{" "}
                          <span>{item[4].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[4].year}</p>
                        {item[4].rated !== "N/A" && (
                          <p>{"Rated: " + item[4].rated}</p>
                        )}
                        {item[4].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[4].runtime}</p>
                        )}
                        {item[4].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[4].imdbRating}</p>
                        )}
                        {item[4].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[4].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[4].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[4].id}
                          value={item[4].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[4].id}
                          value={item[4].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
              <All.Col>
                {item[5] != null && (
                  <All.Card>
                    <All.Card.Header className="text-center">
                      <h5>{item[5].movieName}</h5>
                    </All.Card.Header>
                    <All.Accordion.Item eventKey={5}>
                      <All.Accordion.Header>
                        <All.Image src={item[5].poster} rounded />
                      </All.Accordion.Header>
                      <All.Accordion.Body>
                        <p>
                          Watch it on:{" "}
                          <span>{item[5].placersToWatch + " "}</span>
                        </p>
                        <p>Year: {item[5].year}</p>
                        {item[5].rated !== "N/A" && (
                          <p>{"Rated: " + item[5].rated}</p>
                        )}
                        {item[5].runtime !== "N/A" && (
                          <p>{"Runtime: " + item[5].runtime}</p>
                        )}
                        {item[5].imdbRating !== "N/A" && (
                          <p>{"Rating: " + item[5].imdbRating}</p>
                        )}
                        {item[5].boxOffices != null && (
                          <p>{"Box Office Sales: " + item[5].boxOffices}</p>
                        )}
                        <All.Button
                          target="_blank"
                          href={"https://www.imdb.com/title/" + item[5].id}
                        >
                          Link to IMDB
                        </All.Button>{" "}
                        <All.Button
                          variant="success"
                          id={item[5].id}
                          value={item[5].id}
                          onClick={handleClick}
                        >
                          Add to My Watch List
                        </All.Button>{" "}
                        <All.Button
                          variant="warning"
                          id={item[5].id}
                          value={item[5].id}
                          onClick={handleLike}
                        >
                          Add Like
                        </All.Button>
                        {confirmation != null && (
                          <All.Toast
                            className="d-inline-block m-1"
                            bg="success"
                          >
                            <All.Toast.Body>
                              <strong className="me-auto">
                                {confirmation}
                              </strong>
                            </All.Toast.Body>
                          </All.Toast>
                        )}
                      </All.Accordion.Body>
                    </All.Accordion.Item>
                  </All.Card>
                )}
              </All.Col>
            </All.Row>
          </All.Container>
        </All.Accordion>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <All.Container fluid>
            <All.Row>
              <All.Col>
                <All.Card.Body className="text-center">
                  <All.Form onSubmit={handleSubmit} onChange={onNameChange}>
                    <All.Form.Label htmlFor="SearchItem" visuallyHidden>
                      Movie/Series Search
                    </All.Form.Label>
                    <All.Form.Group>
                      <All.InputGroup className="mb-2">
                        <All.InputGroup.Text>Movie Search</All.InputGroup.Text>
                        <All.FormControl
                          placeholder="Movie/Series Search"
                          aria-label="player username"
                          aria-describedby="input-2"
                          id="SearchItem"
                        />
                        <All.Button
                          variant="outline-secondary"
                          className="button-2"
                          onClick={handleSubmit}
                          type="submit"
                        >
                          Search
                        </All.Button>
                      </All.InputGroup>
                    </All.Form.Group>
                    <div>
                      {error != null && (
                        <All.Toast className="d-inline-block m-1" bg="danger">
                          <All.Toast.Body>
                            <strong className="me-auto">
                              Nothing Found on Search!
                            </strong>
                          </All.Toast.Body>
                        </All.Toast>
                      )}
                    </div>
                  </All.Form>
                </All.Card.Body>
              </All.Col>
            </All.Row>
          </All.Container>
        </div>
      </div>
    );
  }
}

export default ItemSearch;

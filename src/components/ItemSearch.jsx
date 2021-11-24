import React, { useState } from "react";
import * as All from "react-bootstrap";
import { MovieTitle } from "./Urls";

function ItemSearch() {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [item, setItem] = useState([]);
  const [movieName, setMovieName] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoadingScreen(true);
    getsearchdata();
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
        {item.map((el, idx) => {
          return (
            <div key={idx}>
              <All.Accordion>
                <All.Container fluid>
                  <All.Row>
                    <All.Col></All.Col>
                    <All.Col></All.Col>
                    <All.Col>
                      <All.Accordion.Item eventKey={idx}>
                        <All.Accordion.Header>
                          <All.Image src={el.poster} rounded />
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Watch it on: {el.placersToWatch + " "}</p>
                          <p>Year: {el.year}</p>

                          {el.rated !== "N/A" && <p>{"Rated: " + el.rated}</p>}
                          {el.runtime !== "N/A" && (
                            <p>{"Runtime: " + el.runtime}</p>
                          )}
                          {el.imdbRating !== "N/A" && (
                            <p>{"Rating: " + el.imdbRating}</p>
                          )}
                          {el.boxOffices != null && (
                            <p>{"Box Office Sales: " + el.boxOffices}</p>
                          )}
                          <All.Button
                            target="_blank"
                            href={"https://www.imdb.com/title/" + el.id}
                          >
                            Link to IMDB
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                      <hr />
                    </All.Col>
                    <All.Col></All.Col>
                    <All.Col></All.Col>
                  </All.Row>
                </All.Container>
              </All.Accordion>
            </div>
          );
        })}
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

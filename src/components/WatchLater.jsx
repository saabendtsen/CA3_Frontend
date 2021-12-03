import React, { useState, useEffect } from "react";
import * as All from "react-bootstrap";
import { MovieWatchLater, MovieLikes } from "./Urls";
import facade from "../apiFacade";

// Super janky component (mange fejl)
function WatchLater() {
  const [isDataReady, setDataReady] = useState(false);
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = (evt) => {
    evt.preventDefault();
    deleteFromWatchList(evt);
    doit();
  };

  const handleLike = (evt) => {
    evt.preventDefault();
    addLike(evt);
  };

  function deleteFromWatchList(evt) {
    if (evt.target.value != null) {
      const options = facade.makeOptions("DELETE", true);
      fetch(MovieWatchLater + evt.target.value, options)
        .then((res) => {
          setItem([]);
          return res.json();
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setError("No IMDB ID found!");
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

  useEffect(() => {
    setDataReady(false);
    const options = facade.makeOptions("GET", true);
    fetch(MovieWatchLater, options)
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
        setDataReady(true);
      })
      .catch((error) => {
        setError(error);
        setDataReady(false);
      });
  }, []);

  function doit() {
    setDataReady(false);
    const options = facade.makeOptions("GET", true);
    fetch(MovieWatchLater, options)
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
        setDataReady(true);
      })
      .catch((error) => {
        setError(error);
        setDataReady(false);
      });
  }

  if (error) {
    return (
      <div>
        <All.Container fluid>
          <All.Row>
            <All.Col>
              <All.Card.Body className="text-center">
                <All.Toast className="d-inline-block m-1" bg="danger">
                  <All.Toast.Body>
                    <strong className="me-auto">Nothing Found!</strong>
                    <strong className="me-auto">{error}</strong>
                  </All.Toast.Body>
                </All.Toast>
              </All.Card.Body>
            </All.Col>
          </All.Row>
        </All.Container>
      </div>
    );
  } else if (isDataReady) {
    return (
      <div>
        {console.log(item.length)}
        {item.length ? (
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
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[0].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="danger"
                            id={item[0].id}
                            value={item[0].id}
                            onClick={handleClick}
                          >
                            Delete from list
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[0].id}
                            value={item[0].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
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
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[1].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="danger"
                            id={item[1].id}
                            value={item[1].id}
                            onClick={handleClick}
                          >
                            Delete from list
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[1].id}
                            value={item[1].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
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
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[2].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="danger"
                            id={item[2].id}
                            value={item[2].id}
                            onClick={handleClick}
                          >
                            Delete from list
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[2].id}
                            value={item[2].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {item[3] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[3].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={3}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[3].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="danger"
                            id={item[3].id}
                            value={item[3].id}
                            onClick={handleClick}
                          >
                            Delete from list
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[3].id}
                            value={item[3].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
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
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[4].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="danger"
                            id={item[4].id}
                            value={item[4].id}
                            onClick={handleClick}
                          >
                            Delete from list
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[4].id}
                            value={item[4].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
              </All.Row>
              <hr />
              <All.Row>
                <All.Col>
                  {item[5] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[5].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={5}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[5].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
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
                            variant="warning"
                            id={item[5].id}
                            value={item[5].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {item[6] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[6].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={6}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[6].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {item[6].year}</p>
                          {item[6].rated !== "N/A" && (
                            <p>{"Rated: " + item[6].rated}</p>
                          )}
                          {item[6].runtime !== "N/A" && (
                            <p>{"Runtime: " + item[6].runtime}</p>
                          )}
                          {item[6].imdbRating !== "N/A" && (
                            <p>{"Rating: " + item[6].imdbRating}</p>
                          )}
                          {item[6].boxOffices != null && (
                            <p>{"Box Office Sales: " + item[6].boxOffices}</p>
                          )}
                          <All.Button
                            target="_blank"
                            href={"https://www.imdb.com/title/" + item[6].id}
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[6].id}
                            value={item[6].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {item[7] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[7].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={7}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[7].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {item[7].year}</p>
                          {item[7].rated !== "N/A" && (
                            <p>{"Rated: " + item[7].rated}</p>
                          )}
                          {item[7].runtime !== "N/A" && (
                            <p>{"Runtime: " + item[7].runtime}</p>
                          )}
                          {item[7].imdbRating !== "N/A" && (
                            <p>{"Rating: " + item[7].imdbRating}</p>
                          )}
                          {item[7].boxOffices != null && (
                            <p>{"Box Office Sales: " + item[7].boxOffices}</p>
                          )}
                          <All.Button
                            target="_blank"
                            href={"https://www.imdb.com/title/" + item[7].id}
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[7].id}
                            value={item[7].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {item[8] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[8].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={8}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[8].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {item[8].year}</p>
                          {item[8].rated !== "N/A" && (
                            <p>{"Rated: " + item[8].rated}</p>
                          )}
                          {item[8].runtime !== "N/A" && (
                            <p>{"Runtime: " + item[8].runtime}</p>
                          )}
                          {item[8].imdbRating !== "N/A" && (
                            <p>{"Rating: " + item[8].imdbRating}</p>
                          )}
                          {item[8].boxOffices != null && (
                            <p>{"Box Office Sales: " + item[8].boxOffices}</p>
                          )}
                          <All.Button
                            target="_blank"
                            href={"https://www.imdb.com/title/" + item[8].id}
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[8].id}
                            value={item[8].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {item[9] != null && (
                    <All.Card>
                      <All.Card.Header className="text-center">
                        <h5>{item[9].movieName}</h5>
                      </All.Card.Header>
                      <All.Accordion.Item eventKey={9}>
                        <All.Accordion.Header>
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={item[9].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {item[9].year}</p>
                          {item[9].rated !== "N/A" && (
                            <p>{"Rated: " + item[9].rated}</p>
                          )}
                          {item[9].runtime !== "N/A" && (
                            <p>{"Runtime: " + item[9].runtime}</p>
                          )}
                          {item[9].imdbRating !== "N/A" && (
                            <p>{"Rating: " + item[9].imdbRating}</p>
                          )}
                          {item[9].boxOffices != null && (
                            <p>{"Box Office Sales: " + item[9].boxOffices}</p>
                          )}
                          <All.Button
                            target="_blank"
                            href={"https://www.imdb.com/title/" + item[9].id}
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={item[9].id}
                            value={item[9].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
              </All.Row>
            </All.Container>
          </All.Accordion>
        ) : (
          <div>
            <All.Card.Header className="text-center">
              <h1>Please add something to your watch list first</h1>
            </All.Card.Header>
          </div>
        )}
      </div>
    );
  } else {
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
  }
}

export default WatchLater;

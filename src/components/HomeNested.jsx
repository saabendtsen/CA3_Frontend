import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import { MovieLikes, MovieWatchLater } from "./Urls";
import * as All from "react-bootstrap";

const HomeNested = () => {
  const [isDataReady, setDataReady] = useState(false);
  const [movieLikes, setMovieLikes] = useState([]);
  const [error, setError] = useState(null);

  const handleWatchLater = (evt) => {
    evt.preventDefault();
    addToWatchList(evt);
  };
  const handleLike = (evt) => {
    evt.preventDefault();
    addLike(evt);
  };

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

  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(MovieLikes, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        json.map((arr) => {
          return setMovieLikes((data) => [
            ...data,
            {
              id: arr.id,
              movieName: arr.movieName,
              placersToWatch: [arr.placersToWatch],
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
        <div className="text-center">
          <h2>Most Liked Movies</h2>
        </div>

        {movieLikes.length ? (
          <All.Accordion>
            <All.Container fluid>
              <All.Row>
                <hr />
                <All.Col>
                  {movieLikes[0] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={0}>
                        <h6>{movieLikes[0].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[0].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[0].year}</p>
                          {movieLikes[0].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[0].rated}</p>
                          )}
                          {movieLikes[0].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[0].runtime}</p>
                          )}
                          {movieLikes[0].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[0].imdbRating}</p>
                          )}
                          {movieLikes[0].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[0].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[0].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[0].id}
                            value={movieLikes[0].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[0].id}
                            value={movieLikes[0].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[1] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={1}>
                        <h6>{movieLikes[1].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[1].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[1].year}</p>
                          {movieLikes[1].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[1].rated}</p>
                          )}
                          {movieLikes[1].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[1].runtime}</p>
                          )}
                          {movieLikes[1].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[1].imdbRating}</p>
                          )}
                          {movieLikes[1].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[1].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[1].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[1].id}
                            value={movieLikes[1].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[1].id}
                            value={movieLikes[1].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[2] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={2}>
                        <h6>{movieLikes[2].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[2].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[2].year}</p>
                          {movieLikes[2].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[2].rated}</p>
                          )}
                          {movieLikes[2].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[2].runtime}</p>
                          )}
                          {movieLikes[2].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[2].imdbRating}</p>
                          )}
                          {movieLikes[2].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[2].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[2].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[2].id}
                            value={movieLikes[2].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[2].id}
                            value={movieLikes[2].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[3] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={3}>
                        <h6>{movieLikes[3].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[3].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[3].year}</p>
                          {movieLikes[3].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[3].rated}</p>
                          )}
                          {movieLikes[3].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[3].runtime}</p>
                          )}
                          {movieLikes[3].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[3].imdbRating}</p>
                          )}
                          {movieLikes[3].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[3].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[3].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[3].id}
                            value={movieLikes[3].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[3].id}
                            value={movieLikes[3].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[4] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={4}>
                        <h6>{movieLikes[4].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[4].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[4].year}</p>
                          {movieLikes[4].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[4].rated}</p>
                          )}
                          {movieLikes[4].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[4].runtime}</p>
                          )}
                          {movieLikes[4].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[4].imdbRating}</p>
                          )}
                          {movieLikes[4].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[4].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[4].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[4].id}
                            value={movieLikes[4].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[4].id}
                            value={movieLikes[4].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
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
                  {movieLikes[5] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={5}>
                        <h6>{movieLikes[5].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={600}
                            src={movieLikes[5].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[5].year}</p>
                          {movieLikes[5].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[5].rated}</p>
                          )}
                          {movieLikes[5].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[5].runtime}</p>
                          )}
                          {movieLikes[5].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[5].imdbRating}</p>
                          )}
                          {movieLikes[5].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[5].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[5].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[5].id}
                            value={movieLikes[5].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[5].id}
                            value={movieLikes[5].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[6] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={6}>
                        <h6>{movieLikes[6].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[6].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[6].year}</p>
                          {movieLikes[6].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[6].rated}</p>
                          )}
                          {movieLikes[6].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[6].runtime}</p>
                          )}
                          {movieLikes[6].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[6].imdbRating}</p>
                          )}
                          {movieLikes[6].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[6].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[6].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[6].id}
                            value={movieLikes[6].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[6].id}
                            value={movieLikes[6].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[7] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={7}>
                        <h6>{movieLikes[7].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[7].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[7].year}</p>
                          {movieLikes[7].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[7].rated}</p>
                          )}
                          {movieLikes[7].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[7].runtime}</p>
                          )}
                          {movieLikes[7].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[7].imdbRating}</p>
                          )}
                          {movieLikes[7].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[7].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[7].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[7].id}
                            value={movieLikes[7].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[7].id}
                            value={movieLikes[7].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[8] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={8}>
                        <h6>{movieLikes[8].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[8].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[8].year}</p>
                          {movieLikes[8].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[8].rated}</p>
                          )}
                          {movieLikes[8].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[8].runtime}</p>
                          )}
                          {movieLikes[8].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[8].imdbRating}</p>
                          )}
                          {movieLikes[8].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[8].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[8].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[8].id}
                            value={movieLikes[8].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[8].id}
                            value={movieLikes[8].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
                          </All.Button>
                        </All.Accordion.Body>
                      </All.Accordion.Item>
                    </All.Card>
                  )}
                </All.Col>
                <All.Col>
                  {movieLikes[9] != null && (
                    <All.Card className="text-center">
                      <All.Accordion.Item eventKey={9}>
                        <h6>{movieLikes[9].movieName}</h6>
                        <All.Accordion.Header className="text-center">
                          <All.Figure.Image
                            width={175}
                            height={180}
                            src={movieLikes[9].poster}
                          />{" "}
                        </All.Accordion.Header>
                        <All.Accordion.Body>
                          <p>Year: {movieLikes[9].year}</p>
                          {movieLikes[9].rated !== "N/A" && (
                            <p>{"Rated: " + movieLikes[9].rated}</p>
                          )}
                          {movieLikes[9].runtime !== "N/A" && (
                            <p>{"Runtime: " + movieLikes[9].runtime}</p>
                          )}
                          {movieLikes[9].imdbRating !== "N/A" && (
                            <p>{"Rating: " + movieLikes[9].imdbRating}</p>
                          )}
                          {movieLikes[9].boxOffices != null && (
                            <p>
                              {"Box Office Sales: " + movieLikes[9].boxOffices}
                            </p>
                          )}
                          <All.Button
                            target="_blank"
                            href={
                              "https://www.imdb.com/title/" + movieLikes[9].id
                            }
                          >
                            Link to IMDB
                          </All.Button>{" "}
                          <All.Button
                            variant="warning"
                            id={movieLikes[9].id}
                            value={movieLikes[9].id}
                            onClick={handleLike}
                          >
                            Add Like
                          </All.Button>{" "}
                          <All.Button
                            variant="success"
                            id={movieLikes[9].id}
                            value={movieLikes[9].id}
                            onClick={handleWatchLater}
                          >
                            Add to My Watch List
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
              <h2>No Movies have been Liked!</h2>
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
              <All.Spinner animation="border" />
            </h1>
          </All.Card.Header>
        </div>
      </>
    );
  }
};

export default HomeNested;

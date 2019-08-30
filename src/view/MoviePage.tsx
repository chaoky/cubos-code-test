/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import * as getMovie from "getMovie";

const apiKey = "2f1782b66fc79d34a80c426568681445";

const MoviePage: React.FC<RouteComponentProps<{ movie: string }>> = ({
  match
}) => {
  const [movieDetails, setMovieDetails] = useState({ title: "" });
  useEffect(() => {
    (async () => {
      const data: getMovie.RootObject = await (await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.movie}?api_key=${apiKey}&language=pt-BR`
      )).json();

      setMovieDetails({ title: data.title });
    })();
  }, []);
  return (
    <div>
      <h1>{movieDetails.title}</h1>
    </div>
  );
};

export default MoviePage;

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { searchMovie, Result } from "searchMovie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { state } from "mainStore";

const SearchBar: React.FC = () => {
  const apiKey = useSelector((e: state) => e.movieDbKey);
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([{}] as Result[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}&language=pt-BR`
    )
      .then(e => e.json())
      .then((e: searchMovie) => {
        if (e.results !== undefined) setMovieList(e.results.splice(0, 5));
      })
      .finally(() => setLoading(false));
  }, [movieName, apiKey]);

  return (
    <div css={{ width: 300, position: "relative" }}>
      <div css={{ display: "flex" }}>
        <input
          type="text"
          value={movieName}
          placeholder={"Busque um filme por nome, ano ou gênero..."}
          onChange={e => {
            setMovieName(e.target.value);
          }}
          css={{ width: "calc(100% - 16px)", margin: 0, padding: 0 }}
        />
        <Link to={"/search/" + movieName}>
          <button>Buscar</button>
        </Link>
      </div>
      <div
        css={{
          width: "100%",
          backgroundColor: "lightblue",
          position: "absolute",
          visibility: movieName !== "" && !loading ? "visible" : "hidden"
        }}
      >
        {movieList.map((e, i) => (
          <Link to={"/movie/" + e.id} key={i}>
            <div css={{ display: "flex", gap: "10%" }}>
              <img
                src={"https://image.tmdb.org/t/p/w92" + e.poster_path}
                alt={e.title + " poster"}
                css={{ width: 50, height: "auto" }}
              />
              <p>{e.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

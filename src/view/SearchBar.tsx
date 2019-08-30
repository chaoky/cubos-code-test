/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import * as searchMovie from "searchMovie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const apiKey = "2f1782b66fc79d34a80c426568681445";

const SearchBar: React.FC = () => {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([
    { title: "", image: "", id: "" }
  ]);

  useEffect(() => {
    (async () => {
      const data: searchMovie.RootObject = await (await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}&language=pt-BR`
      )).json();

      if (data.results != undefined)
        setMovieList(
          data.results.splice(0, 5).reduce((p: any, e, i) => {
            const title = e.title;
            const image = e.poster_path;
            const id = e.id;
            return [...p, { title, image, id }];
          }, [])
        );
    })();
  }, [movieName]);

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

      {movieName != "" && (
        <div
          css={{
            width: "100%",
            backgroundColor: "lightblue",
            position: "absolute"
          }}
        >
          {movieList.map(e => (
            <Link to={"/movie/" + e.id}>
              <div css={{ display: "flex", gap: "10%" }}>
                <img
                  src={"https://image.tmdb.org/t/p/w92" + e.image}
                  alt={e.title + " poster"}
                  css={{ width: 50, height: "auto" }}
                />
                <p>{e.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

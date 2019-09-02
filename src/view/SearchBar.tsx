/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import { searchMovie, Result } from "searchMovie";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { state } from "mainStore";

const SearchBar: React.FC = () => {
  const apiKey = useSelector((e: state) => e.movieDbKey);
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [movieList, setMovieList] = useState([{}] as Result[]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const genreList = ["Action", "OwO"];

  const param = (() => {
    if (genreList.includes(query)) return "with_genres";
    else if (Number(query) >= 1907 && Number(query) <= new Date().getFullYear() + 1)
      return "primary_release_year";
    else return "query";
  })();

  useEffect(() => {
    if (query.length) {
      setLoading(true);
      axios({
        method: "get",
        baseURL: "https://api.themoviedb.org/3",
        url: param === "query" ? "/search/movie" : "/discover/movie",
        params: {
          api_key: apiKey,
          language: "pt_BR",
          [param]: query
        }
      })
        .then(e => {
          const d: searchMovie = e.data;
          if (d.results !== undefined) setMovieList(d.results.splice(0, 5));
        })
        .finally(() => setLoading(false));
    }
  }, [query, apiKey, param]);

  return (
    <div onMouseLeave={() => setFocused(false)}>
      <div sx={{ display: "flex", gap: ".2em" }}>
        <div sx={{ position: "relative" }}>
          <input
            onKeyPress={() => setFocused(true)}
            value={query}
            type="search"
            placeholder={"Busque um filme por nome, ano ou gênero..."}
            onChange={e => {
              setQuery(e.target.value);
            }}
            sx={{
              all: "unset",
              width: "60vw",
              backgroundColor: "altBg",
              padding: "1em",
              borderRadius: "30px"
            }}
          />

          {query !== "" &&
            !loading &&
            focused &&
            (!movieList.length ? (
              <div
                sx={{
                  width: "100%",
                  zIndex: "999",
                  position: "absolute",
                  top: "100%",
                  borderRadius: "30px",
                  overflow: "hidden",
                  backgroundColor: "bg",
                  textAlign: "center"
                }}>
                <p> Nenhum Resultado</p>
              </div>
            ) : (
              <div
                sx={{
                  width: "100%",
                  position: "absolute",
                  top: "100%",
                  zIndex: "999",
                  borderRadius: "30px",
                  overflow: "hidden"
                }}>
                {movieList.map((e, i) => (
                  <div
                    sx={{
                      backgroundColor: i % 2 === 0 ? "bg" : "altBg",
                      cursor: "pointer"
                    }}
                    key={i}>
                    <Link
                      to={"/movie/" + e.id}
                      sx={{ all: "unset" }}
                      onClick={() => setQuery("")}>
                      <div sx={{ display: "flex", gap: "10%" }}>
                        <img
                          src={"https://image.tmdb.org/t/p/w92" + e.poster_path}
                          alt={e.title + " poster"}
                          sx={{ width: 50, height: "auto" }}
                        />
                        <p>{e.title}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <Link
          to={`/search/${param}/${query}`}
          sx={{ textDecoration: "none", color: "secondary" }}>
          <button
            sx={{
              all: "unset",
              backgroundColor: "altBg",
              borderRadius: "30px",
              padding: "1em"
            }}>
            Buscar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;

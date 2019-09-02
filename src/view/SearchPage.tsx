/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Circle from "./Circle";
import { searchMovie, Result } from "searchMovie";
import { RouteComponentProps } from "react-router";
import { state } from "mainStore";
import { grid, height } from "styled-system";

const SearchPage: React.FC<
  RouteComponentProps<{ query: string; type: string }>
> = props => {
  const apiKey = useSelector((e: state) => e.movieDbKey);
  const [movieList, setMovieList] = useState([{}] as Result[]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const param = props.match.params.type;
  const query = props.match.params.query;

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
          [param]: query,
          page
        }
      })
        .then(e => {
          const d: searchMovie = e.data;
          if (d.results !== undefined) setMovieList(d.results.splice(0, 5));
        })
        .finally(() => setLoading(false));
    }
  }, [query, apiKey, param, page]);

  return loading ? (
    <div></div>
  ) : (
    <div
      sx={{
        paddingTop: "5vh",
        display: "grid",
        gap: "5vh",
        justifyContent: "center"
      }}>
      {movieList.map((e, i) => (
        <div
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "1fr 3fr",
            gridTemplateAreas: "'poster title''poster overview'",
            height: "35vh",
            maxWidth: ["100vw", "65vw"]
          }}>
          <img
            src={"https://image.tmdb.org/t/p/w500" + e.poster_path}
            alt={e.title + "poster"}
            sx={{ height: "35vh", gridArea: "poster" }}
          />

          <div
            sx={{
              gridArea: "title",
              backgroundColor: "secondary",
              color: "primary",
              position: "relative",
              display: "flex",
              alignItems: "end"
            }}>
            <h2
              sx={{
                fontSize: [".9em", "1.3em"],
                margin: ".3em",
                marginLeft: ["4.7rem", "6rem"]
              }}>
              {e.title}
            </h2>
            <div sx={{ position: "absolute", bottom: "-34px", left: ["0", "20px"] }}>
              <Circle text={e.vote_average * 10 + "%"} size={60} />
            </div>
          </div>
          <div
            sx={{
              gridArea: "overview",
              backgroundColor: "bg",
              color: "text",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
            <p sx={{ marginLeft: ["4.7rem", "6rem"] }}>
              {[[8, 10], [4, 8], [0, 4]].reduce(
                (a, n) => (a += e.release_date.slice(n[0], n[1]).replace(/-/g, "/")),
                ""
              )}
            </p>
            <p
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: ["nowrap", "normal"],
                margin: ["1em", "2em"]
              }}>
              {e.overview}
            </p>
            <div
              sx={{
                display: "flex",
                gap: ["1vh", ".5vw"],
                flexDirection: ["column", "row"],
                gridArea: "genres",
                alignItems: ["center", "start"]
              }}>
              {e.genre_ids &&
                e.genre_ids.map((e, i) => (
                  <div
                    key={i}
                    sx={{
                      border: "1px solid",
                      borderColor: "secondary",
                      borderRadius: "20px",
                      padding: "6px",
                      backgroundColor: "white"
                    }}>
                    {e}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1%",
          alignItems: "center"
        }}>
        {[1, 2, 3, 4, 5].map(e => (
          <div onClick={() => setPage(e)} sx={{ cursor: "pointer" }}>
            {e == page ? <Circle text={String(e)} size={40} /> : <p>{e}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

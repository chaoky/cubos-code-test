/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Circle from "./Circle";
import { RouteComponentProps } from "react-router";
import { getMovie } from "getMovie";
import { state } from "mainStore";
import isoLangs from "../isoLangs";

const MoviePage: React.FC<RouteComponentProps<{ movie: string }>> = props => {
  const apiKey = useSelector((e: state) => e.movieDbKey);
  const [movieDetails, setMovieDetails] = useState({} as getMovie);
  const [loading, setLoading] = useState(true);
  const section = { padding: [".5rem", "2rem"] };
  const toBrl = (e: number) =>
    "R$ " +
    e
      .toFixed(2)
      .replace(/\./g, ",")
      .replace(/(\d)(?=(\d{3})+(?:,\d+)?$)/g, "$1.");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.match.params.movie}?append_to_response=videos&api_key=${apiKey}&language=pt-BR`
      )
      .then(e => setMovieDetails({ ...e.data }))
      .finally(() => setLoading(false));
  }, [props.match.params.movie, apiKey]);

  return loading ? (
    <div></div>
  ) : (
    <div>
      <div
        sx={{
          backgroundColor: "bg",
          display: "grid",
          marginTop: "5vh",
          gridTemplateAreas: [
            "'title title' 'poster poster' 'overview overview' 'details score' 'details genres' 'details genres'",
            "'title title title''overview overview poster''details details poster''genres score poster'"
          ]
        }}>
        <div
          sx={{
            backgroundColor: "altBg",
            gridArea: "title",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex"
          }}>
          <h1 sx={{ ...section, margin: 0 }}>{movieDetails.title}</h1>
          <p sx={{ color: "text", fontSize: "1.3em", padding: "1em" }}>
            {[[8, 10], [4, 8], [0, 4]].reduce(
              (a, e) =>
                (a += movieDetails.release_date.slice(e[0], e[1]).replace(/-/g, "/")),
              ""
            )}
          </p>
        </div>

        <img
          sx={{
            gridArea: "poster",
            maxWidth: "100vw",
            justifySelf: "right"
          }}
          src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}
          alt="movie poster"
        />

        <div sx={{ gridArea: "overview", ...section }}>
          <h2>Sinopse</h2>
          <hr sx={{ color: "primary" }} />
          <p sx={{ color: "text" }}>{movieDetails.overview || "Não Encontrada"}</p>
        </div>
        <div sx={{ gridArea: "details", ...section }}>
          <h2>Informaçoes</h2>
          <hr sx={{ color: "primary" }} />
          <div
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              gap: "1em",
              justifyContent: "space-between"
            }}>
            {[
              [
                "Situaçao",
                new Date(movieDetails.release_date) > new Date() ? "Nope" : "Lançado"
              ],
              ["Idioma", (isoLangs as any)[movieDetails.original_language].name],
              [
                "Duraçao",
                `${~~(movieDetails.runtime / 60)}h 
                ${~~(movieDetails.runtime % 60)}min`
              ],
              [
                "Orcamento",
                movieDetails.budget ? toBrl(movieDetails.budget) : "Não Encontrado"
              ],
              [
                "Receita",
                movieDetails.revenue ? toBrl(movieDetails.revenue) : "Não Encontrado"
              ],
              [
                "Lucro",
                movieDetails.revenue && movieDetails.budget
                  ? toBrl(Math.abs(movieDetails.revenue - movieDetails.budget))
                  : "Não Encontrado"
              ]
            ].map(e => (
              <div key={e[0]}>
                <h3>{e[0]}</h3>
                <p sx={{ color: "text" }}>{e[1]}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          sx={{
            display: "flex",
            gap: ["1vh", ".5vw"],
            flexDirection: ["column", "row"],
            gridArea: "genres",
            alignItems: ["center", "start"],
            ...section
          }}>
          {movieDetails.genres.map(e => (
            <div
              key={e.id}
              sx={{
                border: "1px solid",
                borderColor: "secondary",
                borderRadius: "20px",
                padding: "6px",
                backgroundColor: "white"
              }}>
              {e.name}
            </div>
          ))}
        </div>
        <div
          sx={{
            gridArea: "score",
            width: "150px",
            height: "150px",
            alignSelf: "center",
            justifySelf: "center",
            ...section
          }}>
          <Circle text={movieDetails.vote_average * 10 + "%"} size={130} />
        </div>
      </div>
      {movieDetails.videos!.results[0] ? (
        <iframe
          sx={{
            height: "70vh",
            width: "99vw",
            margin: "5vh 0"
          }}
          src={"https://www.youtube.com/embed/" + movieDetails.videos!.results[0].key}
          title="trailer"></iframe>
      ) : (
        <div>Trailer Indisponivel</div>
      )}
    </div>
  );
};

export default MoviePage;

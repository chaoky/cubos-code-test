/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useState, useEffect } from "react";

import axios from "axios";

import { state, action } from "mainStore";

import theme from "../theme";
import SearchBar from "./SearchBar";
import MoviePage from "./MoviePage";
import SearchPage from "./SearchPage";

const store = createStore(
  (
    state: state = {
      movieDbKey: "2f1782b66fc79d34a80c426568681445",
      genres: [{ id: 0, name: "" }]
    },
    action: action
  ): any => {
    switch (action.type) {
      case "UPDATE_GENRES":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          store.getState().movieDbKey
        }&language=pt-BR`
      )
      .then(e => store.dispatch({ type: "UPDATE_GENRES", payload: e.data }))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Global
            styles={{
              body: {
                margin: 0,
                padding: 0,
                fontFamily: "'Abel', sans-serif",
                boxSizing: "border-box",
                overflowX: "hidden",
                color: theme.colors.secondary
              }
            }}
          />
          <div>
            <header
              sx={{
                backgroundColor: "secondary",
                display: "flex",
                justifyContent: "center"
              }}>
              <Link
                to="/"
                sx={{
                  all: "unset",
                  color: "primary",
                  cursor: "pointer",
                  ":hover": { color: "accent" }
                }}>
                <h1>Movies</h1>
              </Link>
            </header>
            <div sx={{ display: "flex", justifyContent: "center", paddingTop: "5vh" }}>
              <SearchBar />
            </div>
            <Route
              exact
              path="/"
              component={() => (
                <div
                  css={{
                    paddingTop: "5vh",
                    gap: "20%",
                    display: "grid",
                    justifyItems: "center"
                  }}>
                  <div css={{ textAlign: "center" }}>
                    <h4>Filmes em Destaque</h4>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, qui
                      rerum ut ducimus recusandae voluptas omnis. Animi velit voluptatem
                      voluptas quibusdam, totam, eos necessitatibus ea quaerat quas minus
                      explicabo libero.
                    </div>
                  </div>
                </div>
              )}
            />
            <Route path="/search/:type/:query" component={SearchPage} />
            <Route exact path="/movie/:movie" component={MoviePage} />
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { state } from "mainStore";
import theme from "../theme";
import SearchBar from "./SearchBar";
import MoviePage from "./MoviePage";
import SearchPage from "./SearchPage";

const store = createStore(
  (state: state = { movieDbKey: "2f1782b66fc79d34a80c426568681445" }, action) => {
    switch (action.type) {
      default:
        return { ...state };
    }
  }
);

const App: React.FC = () => (
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

export default App;

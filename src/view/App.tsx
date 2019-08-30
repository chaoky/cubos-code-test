/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import MoviePage from "./MoviePage";
import SearchPage from "./SearchPage";

const store = createStore((state = {}, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
});

const App: React.FC = () => (
  <Router>
    <Global
      styles={{
        body: { margin: 0, padding: 0, fontFamily: "'Abel', sans-serif" }
      }}
    />
    <div>
      <header
        css={{
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Link to="/">
          <h1 css={{ color: "lightblue" }}>Movies</h1>
        </Link>
      </header>
      <Route
        exact
        path="/"
        component={() => (
          <div
            css={{
              paddingTop: "20%",
              gap: "20%",
              display: "grid",
              justifyItems: "center"
            }}
          >
            <SearchBar />
            <div css={{ textAlign: "center" }}>
              <h4>Filmes em Destaque</h4>
              <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                qui rerum ut ducimus recusandae voluptas omnis. Animi velit
                voluptatem voluptas quibusdam, totam, eos necessitatibus ea
                quaerat quas minus explicabo libero.
              </div>
            </div>
          </div>
        )}
      />
      <Route path="/search/:movie" component={SearchPage} />
      <Route path="/movie/:movie" component={MoviePage} />
    </div>
  </Router>
);

export default App;

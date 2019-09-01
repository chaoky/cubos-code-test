/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";

const SearchPage: React.FC<RouteComponentProps<{ movie: string }>> = ({
  match
}) => {
  return <div>{match.params.movie}</div>;
};

export default SearchPage;

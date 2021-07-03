import React from "react";
import { useHistory } from "react-router-dom";
import DeckView from "./DeckView";

export default function Home({ decks }) {
  //Load history for button
  const history = useHistory();

  //Make sure decks object has items
  if (decks) {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/decks/new")}
        >
          Create Deck
        </button>
        <hr />
        <DeckView decks={decks} />
      </React.Fragment>
    );
  } else {
    //No decks
    return <h3>...Loading Decks</h3>;
  }
}

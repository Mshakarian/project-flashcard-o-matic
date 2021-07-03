import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function NotEnoughCards({ deckName, deckId, cardsLength }) {
  //get history for button
  const history = useHistory();

  //navbar object
  const navigation = { Home: "/", [deckName]: `/decks/${deckId}/`, Study: " " };

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h2>{deckName}: Study</h2>
      <hr />
      <h3>Not enough cards</h3>
      <br />
      <p>
        You need at least 3 cards to study. There are only {cardsLength} cards
        in this deck.
      </p>
      <br />
      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
        Add Cards
      </button>
    </React.Fragment>
  );
}

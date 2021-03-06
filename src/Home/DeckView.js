import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

export default function DeckView({ decks }) {
  //Pull history to use for buttons
  const history = useHistory();

  //Delete handler for deck
  async function deleteHandler(deck) {
    //Abort controller for deleteDeck API call
    const abortController = new AbortController();
    const deckId = deck.id;

    //Confirm window to make sure user wants to delete deck
    const confirm = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    //If "ok" is clicked, delete hte deck and refresh the home screen
    if (confirm) {
      deleteDeck(deckId, abortController.signal);
      window.location.reload();

      return () => abortController.abort();
    } else {
      history.push("/");
    }
  }

  //Map through decks to display each deck
  const decksDisplayed = decks.map((deck, index) => (
    <div key={index}>
      <h3>{deck.name}</h3>
      <h6>{deck.cards.length} cards</h6>
      <p>{deck.description}</p>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/decks/${deck.id}/`)}
      >
        View
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => history.push(`decks/${deck.id}/study`)}
      >
        Study
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => deleteHandler(deck)}
      >
        Delete
      </button>
      <hr />
    </div>
  ));

  //Return the decks in a div; add card class later
  return <React.Fragment>{decksDisplayed}</React.Fragment>;
}

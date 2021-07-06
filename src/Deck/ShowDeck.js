import React from "react";
import { deleteDeck } from "../utils/api/index";
import NavBar from "../NavBar/NavBar";

// this function will take in deck and url for buttons, display name and description of deck, buttons for edit, study, add cards, delete

export default function ShowDeck({ deck, url, history }) {
  //delete handler
  async function deleteHandler(deck) {
    //abort controller for deleteCard API call
    const abortController = new AbortController();

    //Confirm window
    const confirm = window.confirm(
      "Are you sure you want to delete this card?"
    );

    //if "ok" clicked, delete card and refresh
    if (confirm) {
      deleteDeck(deck.id, abortController.signal);
      history.push("/");
      window.location.reload();

      return () => abortController.abort();
    } else {
      history.push("/");
    }
  }

  //nav object
  const navigation = { Home: "/", [deck.name]: " " };

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`${url}edit`)}
      >
        Edit
      </button>
      <button
        className="btn btn-warning"
        onClick={() => history.push(`${url}study`)}
      >
        Study
      </button>
      <button
        className="btn btn-success"
        onClick={() => history.push(`${url}cards/new`)}
      >
        Add Cards
      </button>
      <button className="btn btn-danger" onClick={() => deleteHandler(deck)}>
        Delete
      </button>
    </React.Fragment>
  );
}

import React from "react";
import { deleteDeck } from "../utils/api/index";
import NavBar from "../NavBar/NavBar";

// this function will take in deck and url for buttons, display name and description of deck, buttons for edit, study, add cards, delete

export default function ShowDeck({ deck, url, history }) {
  //deconstruct deck
  const { name, description, id } = deck;

  //nav object
  const navigation = { Home: "/", [name]: " " };

  //delete handler
  // async function deleteHandler(id) {
  //   //Abort controller for deleteDeck API call
  //   const abortController = new AbortController();

  //   //confirm window
  //   const confirm = window.confirm(
  //     "Are you sure you want to delete this deck?"
  //   );

  //   //if "ok" clicked, delete the deck and refresh the home screen
  //   if (confirm) {
  //     deleteDeck(id, abortController.signal);
  //     history.push("/");
  //     return () => abortController.abort();
  //   } else {
  //     history.push({ url });
  //   }
  // }
  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h3>{name}</h3>
      <p>{description}</p>
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
      <button
        className="btn btn-danger"
        onClick={() => {
          const abortController = new AbortController();

          //confirm window
          const confirm = window.confirm(
            "Are you sure you want to delete this deck?"
          );

          //if "ok" clicked, delete the deck and refresh the home screen
          if (confirm) {
            deleteDeck(id, abortController.signal);
            history.push("/");
            return () => abortController.abort();
          } else {
            history.push({ url });
          }
        }}
      >
        Delete
      </button>
    </React.Fragment>
  );
}

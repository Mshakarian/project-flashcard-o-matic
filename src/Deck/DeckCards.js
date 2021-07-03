import React from "react";
import { deleteCard } from "../utils/api/index";

// this function will take in cardsa nd the URL and map through them to return the JSX for each card.

export default function ShowCards({ deck, url, history }) {
  //delete handler
  async function deleteHandler(card) {
    //abort controller for deleteCard API call
    const abortController = new AbortController();

    //Confirm window
    const confirm = window.confirm(
      "Are you sure you want to delete this card?"
    );

    //if "ok" clicked, delete card and refresh
    if (confirm) {
      deleteCard(card.id, abortController.signal);
      window.location.reload();

      return () => abortController.abort();
    } else {
      history.push({ url });
    }
  }

  //inline css variables for table data and header
  const tdStyle = {
    width: "20%",
    textAlign: "center",
    padding: "15px",
  };

  const thStyle = {
    paddingTop: "15px",
    fontSize: "20px",
  };

  const deckCards = deck.cards.map((card, index) => (
    <tbody>
      <tr key={index}>
        <td style={tdStyle}>{card.front}</td>
        <td style={tdStyle}>{card.back}</td>
        <button
          className="btn btn-secondary"
          onClick={() => history.push(`${url}cards/${card.id}/edit`)}
        >
          Edit
        </button>
        <br />
        <button className="btn btn-danger" onClick={() => deleteHandler(card)}>
          Delete
        </button>
        <br />
      </tr>
    </tbody>
  ));

  return (
    <table>
      <thead style={thStyle}>
        <tr>
          <th style={thStyle}>Cards:</th>
        </tr>
      </thead>
      <thead>
        <tr style={{ fontSize: 20 }}>
          <td style={tdStyle}>Front:</td>
          <td style={tdStyle}>Back:</td>
        </tr>
      </thead>
      {deckCards}
    </table>
  );
}

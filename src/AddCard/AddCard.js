import React, { useState } from "react";
import NewCardForm from "./CardForm";
import NavBar from "../NavBar/NavBar";
import { createCard } from "../utils/api";

export default function AddCards({ deckName, deckId }) {
  //Set card state to be passed
  const [card, setCard] = useState({
    front: "Front of the card",
    back: "Back of the card",
  });

  //Create NavBar object
  const navigation = {
    Home: "/",
    [deckName]: `/decks/${deckId}/`,
    "Add Card": " ",
  };

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h3>{deckName}: Add Card</h3>
      <NewCardForm deckId={deckId} card={card} cardFunction={createCard} />
    </React.Fragment>
  );
}

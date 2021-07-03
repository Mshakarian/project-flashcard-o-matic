import React from "react";
import DeckForm from "../CreateDeck/DeckForm";
import { updateDeck } from "../utils/api/index";
import NavBar from "../NavBar/NavBar";

export default function EditDeck({ deck }) {
  //extract deck name and id
  const { name, id } = deck;

  //navbar object
  const navigation = { Home: "/", [name]: `decks/${id}/`, "Edit Deck": " " };

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h2>Edit Deck</h2>
      <DeckForm deck={deck} deckFunction={updateDeck} />
    </React.Fragment>
  );
}

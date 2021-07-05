import React, { useState } from "react";
import DeckForm from "./DeckForm";
import NavBar from "../NavBar/NavBar";
import { createDeck } from "../utils/api";

//add nav bars and states to each later

//Create deck page
export default function CreateDeck() {
  //create navbar object
  const navigation = { Home: "/", "Create Deck": " " };

  //set deck state to be passed
  const [deck, setDeck] = useState({
    name: "Enter a name",
    description: "Enter a description",
  });

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h2>Create A New Deck</h2>
      <DeckForm deck={deck} deckFunction={createDeck} />
    </React.Fragment>
  );
}

import React from "react";
import NotEnoughCards from "./NotEnoughCards";
import StudyCards from "./StudyCards";
import NavBar from "../NavBar/NavBar";

export default function StudyDeck({ deck }) {
  //extract name and id from deck
  const { name, id, cards } = deck;

  //navbar object
  const navigation = { Home: "/", [name]: `/decks/${id}/`, Study: " " };

  if (cards.length < 3) {
    return (
      <NotEnoughCards deckName={name} deckId={id} cardsLength={cards.length} />
    );
  } else {
    return (
      <React.Fragment>
        <NavBar navigation={navigation} />

        <h2>Study: {name}</h2>

        <StudyCards cards={cards} />
      </React.Fragment>
    );
  }
}

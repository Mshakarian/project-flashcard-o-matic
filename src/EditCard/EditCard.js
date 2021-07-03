import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "../AddCard/CardForm";
import NavBar from "../NavBar/NavBar";

export default function EditCard({ deckName }) {
  //get card id
  const { deckId, cardId } = useParams();

  //nav object
  const navigation = {
    Home: "/",
    [deckName]: `/decks/${deckId}/`,
    [`Edit Card ${cardId}`]: " ",
  };

  //create initial card
  const initialCard = { front: "", back: "" };

  //create card state to pass to card form
  const [card, setCard] = useState(initialCard);
  // eslint-disable-next-line no-unused-vars
  const [deck, setDeck] = useState({});

  useEffect(() => {
    //set deck
    setDeck({});

    //abort controller
    const abortController = new AbortController();

    //gather cards for deck
    async function getTheCard() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
        const thisCard = await readCard(cardId);
        setCard(thisCard);
      } catch (error) {
        if (error === "AbortError") {
          console.log(error);
        } else {
          throw error;
        }
      }
    }
    getTheCard();
    return () => abortController.abort();
  }, [deckId, cardId]);

  return (
    <React.Fragment>
      <NavBar navigation={navigation} />
      <h2>Edit Card</h2>
      <CardForm card={card} deckId={deckId} cardFunction={updateCard} />
    </React.Fragment>
  );
}

import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import ShowDeck from "./ShowDeck";
import DeckCards from "./DeckCards";
import EditDeck from "../EditDeck/EditDeck";
import EditCard from "../EditCard/EditCard";
import StudyDeck from "../Study/StudyDeck";
import AddCards from "../AddCard/AddCard";
import { readDeck } from "../utils/api";

//This function will host:
//A component rendering the deck and cards as two separate components
//A component rendering the study page
//A component rendering the EditDeck page
//A component rendering the AddCard page

export default function HostDeck({ decks }) {
  const history = useHistory();

  //get deckId param for initialDeck
  const { deckId } = useParams();

  //get route match for URL
  const { url, path } = useRouteMatch();

  //create initialDeck with cards array
  const initialDeck = { name: "", description: "", id: { deckId }, cards: [] };

  //deck state to be passed to ShowDeck
  const [deck, setDeck] = useState(initialDeck);

  //useEffect for after initial render to read the deck

  useEffect(
    (initialDeck) => {
      //reset the deck
      setDeck(initialDeck);

      //abort controller
      const abortController = new AbortController();

      //read the deck
      async function readTheDeck() {
        try {
          const pulledDeck = await readDeck(deckId, abortController.signal);
          setDeck(pulledDeck);
        } catch (error) {
          if (error === "AbortError") {
            console.log(error);
          } else {
            throw error;
          }
        }
      }
      readTheDeck();
      return () => abortController.abort();
    },
    [deckId]
  );
  if (deck) {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path={url}>
            <ShowDeck deck={deck} url={url} history={history} />
            <DeckCards deck={deck} url={url} history={history} />
          </Route>
          <Route path={`${path}/study`}>
            <StudyDeck deck={deck} />
          </Route>
          <Route path={`${path}/edit`}>
            <EditDeck deck={deck} />
          </Route>
          <Route path={`${path}/cards/new`}>
            <AddCards deckName={deck.name} deckId={deck.id} />
          </Route>
          <Route path={`${path}/cards/:cardId/edit`}>
            <EditCard deckName={deck.name} deckUrl={url} />
          </Route>
        </Switch>
      </React.Fragment>
    );
  } else {
    return <h3>...Loading deck and cards</h3>;
  }
}

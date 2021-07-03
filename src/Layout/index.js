import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import HostDeck from "../Deck/Deck";
import CreateDeck from "../CreateDeck/CreateDeck";
import { listDecks } from "../utils/api/index";
import { Route, Switch } from "react-router-dom";

function Layout() {
  //initial state for decks
  const initialDecks = [];

  //set state for decks
  const [decks, setDecks] = useState(initialDecks);

  //load decks and cards to be displayed after initial render
  useEffect((initialDecks) => {
    //set decks and cards to empty value
    setDecks(initialDecks);

    //abort controller for API fetch
    const abortController = new AbortController();

    //load the cards and decks
    async function getDecks() {
      try {
        const pulledDecks = await listDecks(abortController.signal);
        setDecks(pulledDecks);
      } catch (error) {
        //handle the error
        if (error === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    //call getDecksAndCards
    getDecks();

    //abort controller return
    return () => abortController.abort();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <HostDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;

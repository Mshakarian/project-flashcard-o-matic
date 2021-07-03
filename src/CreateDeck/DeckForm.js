import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function DeckForm({ deck, deckFunction }) {
  //deck will have either the pre-filled default deck (new) or the current deck info (edit)

  //history for buttons
  const history = useHistory();

  //inline css variable for button
  const formButtonStyle = {
    borderRadius: "10%",
    marginBottom: "8px",
  };

  //set new blank deck state
  const [newDeck, setNewDeck] = useState(deck);

  //change handler
  const changeHandler = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  //submit handler
  const submitHandler = (event, newDeck) => {
    event.preventDefault();

    //abort controller for deckFunction API call
    const abortController = new AbortController();

    //use function passed from page
    const submittedDeck = deckFunction(newDeck, abortController.signal);
    setNewDeck(deck);
    history.push(`/decks/${submittedDeck.id}/`);

    //Abort controller
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <form onSubmit={() => submitHandler(newDeck)}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          name={deck.name}
          type="text"
          onChange={changeHandler}
          value={deck.name}
          placeholder={deck.name}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name={deck.description}
          onChange={changeHandler}
          value={deck.description}
          placeholder={deck.description}
          rows={8}
          cols={45}
        />
        <hr />
        <button
          type="submit"
          style={formButtonStyle}
          className="d-block btn btn-success"
        >
          Submit
        </button>
        <button
          style={formButtonStyle}
          className="d-block btn btn-danger"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </form>
    </React.Fragment>
  );
}

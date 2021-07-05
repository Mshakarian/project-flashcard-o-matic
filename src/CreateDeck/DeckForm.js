import React, { useState, useEffect } from "react";
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
  const initialDeck = deck;
  const [newDeck, setNewDeck] = useState(initialDeck);
  useEffect(() => {
    const abortController = new AbortController();
    setNewDeck(initialDeck);
    return abortController.abort();
  }, [initialDeck]);

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
    setNewDeck(submittedDeck);
    history.push("/");
    window.location.reload();

    //Abort controller
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <form onSubmit={(event) => submitHandler(event, newDeck)}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          onChange={changeHandler}
          value={newDeck.name}
          placeholder={newDeck.name}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          onChange={changeHandler}
          value={newDeck.description}
          placeholder={newDeck.description}
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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function NewCardForm({ deckId, card, cardFunction }) {
  //deck will have either the pre-filled default deck (new) or the current deck info (edit)

  //Get history for use later
  const history = useHistory();

  //Set card state
  const initialCard = card;
  const [newCard, setNewCard] = useState(initialCard);

  //change handler
  const changeHandler = ({ target }) => {
    setNewCard({ ...newCard, [target.name]: target.value });
  };

  //submit handler
  async function submitHandler(event, newCard, deckId) {
    event.preventDefault();
    //Abort Controller for deckFunction API call
    const abortController = new AbortController();

    //use function passed from page
    const submittedCard = await cardFunction(
      deckId,
      newCard,
      abortController.signal
    );
    setNewCard(submittedCard);
    history.push(`/decks/${deckId}/`);
    //abort controller
    return () => abortController.abort();
  }
  console.log(newCard);
  return (
    <React.Fragment>
      <form onSubmit={() => submitHandler(newCard, deckId)}>
        <label htmlFor="front">Front:</label>
        <br />
        <textarea
          id="front"
          name="front"
          value={newCard.front}
          placeholder={card.front}
          onChange={changeHandler}
          required
          cols={40}
          rows={5}
        />
        <hr />
        <label htmlFor="back">Back:</label>
        <br />
        <textarea
          id="back"
          name="back"
          value={newCard.back}
          placeholder={card.back}
          onChange={changeHandler}
          required
          cols={40}
          rows={5}
        />
        <button type="submit">Submit</button>
        <button onClick={() => history.push("/")}>Cancel</button>
      </form>
    </React.Fragment>
  );
}

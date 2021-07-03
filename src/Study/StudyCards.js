import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function StudyCards({ cards }) {
  //create initial card state
  const initialCard = { number: 1, side: "front" };

  //set card state
  const [studyCard, setStudyCard] = useState(initialCard);

  //history pull
  const history = useHistory();

  // inline CSS variable for button
  const divButton = {
    borderRadius: "10%",
    margin: "8px",
  };

  //next card click function
  const nextCard = () => {
    //check which card number is being looked at to see if it's the last one
    if (studyCard.number < cards.length) {
      setStudyCard({
        ...studyCard,
        number: studyCard.number + 1,
        side: "front",
      });
    } else {
      //confirm window to restart same deck or go back to home
      const confirm = window.confirm("Do you want to restart this deck?");
      if (confirm) {
        setStudyCard(initialCard);
      } else {
        setStudyCard(initialCard);
        history.push("/");
      }
    }
  };

  //iterate through cards
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    //check that card id matches with studyCard id
    if (i + 1 === studyCard.number) {
      //check studyCard side
      if (studyCard.side === "front") {
        return (
          <React.Fragment>
            <h4>
              Card {studyCard.number} of {cards.length}
            </h4>
            <p>{card.front}</p>
            <button
              style={divButton}
              onClick={() => setStudyCard({ ...studyCard, side: "back" })}
            >
              Flip Card
            </button>
          </React.Fragment>
        );
      } else {
        //side = back
        return (
          <React.Fragment>
            <h4>
              Card {studyCard.number} of {cards.length}
            </h4>
            <p>{card.back}</p>
            <button
              style={divButton}
              onClick={() => setStudyCard({ ...studyCard, side: "front" })}
            >
              Flip Card
            </button>
            <button style={divButton} onClick={() => nextCard()}>
              Next Card
            </button>
          </React.Fragment>
        );
      }
    }
  }
}

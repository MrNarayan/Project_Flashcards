import React from "react";
import {useHistory} from "react-router-dom";

// Component to be used in both the Add Card and Edit Card Screens

function CardForm({ card, handleChange, deckId}) {
    const history = useHistory();

  return (
    <div>
      <div className="form-group">
        <label htmlFor="cardFront">Front</label>
        <textarea
          id="cardFront"
          name="cardFront"
          className="form-control"
          placeholder="Front side of card"
          rows="3"
          onChange={handleChange}
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardBack">Back</label>
        <textarea
          id="cardBack"
          name="cardBack"
          className="form-control"
          placeholder="Back side of card"
          rows="3"
          onChange={handleChange}
          value={card.back}
        />
      </div>
        <button
            type="button"
            className="btn btn-dark mr-2"
            onClick={() => history.push(`/decks/${deckId}`)}
        >
            Cancel
        </button>
        <button type="submit" className="btn btn-success">
            Submit
        </button>
    </div>
  );
}

export default CardForm;

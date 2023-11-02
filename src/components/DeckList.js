import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function DeckList() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await listDecks(abortController.signal);
                setDecks(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleDelete(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            history.go(0);
            return await deleteDeck(deck.id);
        }
    }

    return (
        <div className="container">
            <button
                type="button"
                className="btn btn-success mb-3 btn-lg"
                onClick={() => history.push("/decks/new")}
            >
                <span className="oi oi-plus" /> Create Deck
            </button>
            <div className="card-deck">
                {decks.map((deck) => {
                    return (
                        <div
                            className="card"
                            style={{ width: "30rem" }}
                            key={deck.id}
                        >
                            <div className="card-body">
                                <div className="card-title">
                                    {`${deck.name}`}
                                </div>
                                <div className="card-subtitle mb-2 text-muted">
                                    {`${deck.cards.length} cards`}
                                </div>
                                <div className="card-text">
                                    {`${deck.description}`}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-dark mr-2"
                                    onClick={() => history.push(`/decks/${deck.id}`)}
                                >
                                    <span className="oi oi-eye" /> View
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary mr-2"
                                    onClick={() => history.push(`/decks/${deck.id}/study`)}
                                >
                                    <span className="oi oi-book" /> Study
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mx-1 oi oi-trash"
                                    onClick={() => handleDelete(deck)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DeckList;

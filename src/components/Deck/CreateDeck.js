import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createDeck} from "../../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({});

    function handleChange({ target }) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        history.push("/");
        if (newDeck.name === "" || newDeck.name === undefined || newDeck.description === "" || newDeck.description === undefined) {
            alert("Please input name and description");
        }
        else
        {
            return await createDeck(
                {...newDeck},
                abortController.signal
            );
        }
    }

    async function handleCancel() {
        history.push("/");
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create Deck</h1>
                <DeckForm deck={newDeck} handleChange={handleChange} handleCancel={handleCancel}/>
            </form>
        </div>
    );
}

export default CreateDeck;

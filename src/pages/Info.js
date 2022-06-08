import React, { useState, useEffect } from 'react';
import { baseUrl} from "../vars.js";

function Info() {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/test`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.items);
            if (res.items !== 0){
                setMessage(res.items);
                return;
            }
            // console.log("empty list!");
            setMessage([]);
        });
    }, []);

    if (!message) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>No cloud provider API is connected.</p>
            </div>
        );
    }

    let listItems = message.map((d) => <li key={d.name}>{d.name}: {d.email}</li>);
    if (listItems.length === 0) {
        listItems = "Empty database collection"
    }
    return (
        <div>
            <h1>Welcome!</h1>
            <p>This is a test page with a simple fetch to a get-route</p>
            <p>Items in the database:</p>
            <p><i>{listItems}</i></p>
        </div>
    );
}

export default Info;

import React, { useState, useEffect } from 'react';
import { baseUrl} from "../vars.js";

function AuthInfo() {
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const [message, setMessage] = useState(null);
    // const [provider, setProvider] = useState(null);

    useEffect(() => {
        console.log("token: " + token);
        fetch(`${baseUrl}/auth`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            setMessage(res.message);
            // setProvider(res.provider);
        });
    }, []);


    if (!message) {
        return (
            <div>
                <h1>Log in required</h1>
                <p>You need to log in to see this information</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Message: {message}</p>
            <p>Logged in user: {user}</p>
        </div>
    );
}

export default AuthInfo;

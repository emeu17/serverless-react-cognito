import '../Form.css';
import React, { useState } from 'react';
import { userPoolid, clientid} from "../vars.js";

var poolData = {
	UserPoolId: userPoolid, // Your user pool id here
	ClientId: clientid, // Your client id here
};
// var AWS = require('aws-sdk/dist/aws-sdk-react-native');
// var userPool = new AWS.AmazonCognitoIdentity.CognitoUserPool(poolData);
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

function Register() {
    // React hooks
    const isScreenMounted = React.createRef();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [messageCont, setMessageCont] = useState("");

    async function registerUser(user, pswd) {
        var dataEmail = {
        	Name: 'email',
        	Value: user,
        };

        // console.log(dataEmail);

        // var dataPhoneNumber = {
        // 	Name: 'phone_number',
        // 	Value: '+15555555555',
        // };
        // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        // var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
        // 	dataPhoneNumber
        // );

        // attributeList.push(attributeEmail);

        userPool.signUp(user, pswd, attributeList, null, function(
        	err,
        	result
        ) {
        	if (err) {
        		alert(err.message || JSON.stringify(err));
        		return;
        	}
        	var cognitoUser = result.user;
        	// console.log('user name is ' + cognitoUser.getUsername());
        });

    }

    async function handleSubmit (event) {
        //Prevent page reload
        event.preventDefault();

        // console.log("user and password: " + user + ", " + password);

        // try registering user
        await registerUser(user, password);
    };

    return (
        <div>
            <h1>Register new user</h1>
            <form onSubmit={handleSubmit}>
                { showMessage &&
                    <p> {messageCont} </p>
                }
                <label className="input-label">Email</label>
                <input
                    type="text"
                    className="input"
                    onChange={e => setUser(e.target.value)}
                />
                <label className="input-label">Password</label>
                <input
                    type="password"
                    className="input"
                    onChange={e => setPassword(e.target.value)}
                />
                <div>
                    <button type="submit" className="Reg-btn">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;

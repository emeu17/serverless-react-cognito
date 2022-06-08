import '../Form.css';
import React, { useState } from 'react';
import { baseUrl, homepage, userPoolid, clientid} from "../vars.js";

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


function Login() {
    // React hooks
    const isScreenMounted = React.createRef();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [messageCont, setMessageCont] = useState("");

    async function loginUser(user, pswd) {
        // console.log("user: " + user + ", password: " + pswd);
        var userData = {
        	Username: user,
        	Pool: userPool,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
        // cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

        let authenticationDetails = new AuthenticationDetails({
          Username: user,
          Password: pswd
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            //if success, save token in sessionStorage
            //else it will show message why login failed
        	onSuccess: function(result) {
        		// console.log("success!");
                // console.log(result);
                var accessToken = result.getAccessToken().getJwtToken();
                // console.log("token: " + accessToken);
                sessionStorage.setItem('token', accessToken);
                // console.log("User: " + user);
                sessionStorage.setItem('user', user);
                window.location.assign(`${homepage}/`);
        	},
            //alert box with error message
        	onFailure: function(err) {
        		alert(err.message || JSON.stringify(err));
        	},
        });

    }

    async function handleSubmit (event) {
        //Prevent page reload
        event.preventDefault();

        // console.log("user and password: " + user + ", " + password);

        // try logging in and getting token
        await loginUser(user, password);
    };

    const loggedinuser = sessionStorage.getItem('user');
    if (loggedinuser) {
        return (
            <div>
                <h1>Already logged in</h1>
                <p>User {loggedinuser} has already signed in.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                { showMessage &&
                    <p className="red-msg">Login failed: {messageCont}</p>
                }
                <label className="input-label">Username</label>
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
                    <button type="submit" className="Reg-btn">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

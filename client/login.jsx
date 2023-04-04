const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if(!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});

    return false;
};

const handleChangePass = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value
    const oldPass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const pass3 = e.target.querySelector('#pass3').value;

    if ( !username || !oldPass || !pass2 || !pass3 ) {
        helper.handleError('All fields are required!');
        return false;
    }

    if ( oldPass === pass2 || oldPass === pass3) {
        helper.handleError('New password must be different from old password!');
        return false;
    }

    if ( pass2 !== pass3 ) {
        helper.handleError('New password fields do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, oldPass, pass2, pass3});

    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    )
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    )
};

const ChangePassWindow = (props) => {
    return (
        <form id="changePassForm"
            name="changePassForm"
            onSubmit={handleChangePass}
            action="/changePassword"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Current Password: </label>
            <input id="pass" type="password" name="pass" placeholder="old password" />
            <label htmlFor="pass2">New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="new password" />
            <label htmlFor="pass3">Retype New Password: </label>
            <input id="pass3" type="password" name="pass3" placeholder="new password" />
            <input className="formSubmit" type="submit" value="Change password" />
        </form>
    )
}

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />,
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />,
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow />,
        document.getElementById('content'));
};

window.onload = init;
const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
    return res.render('login');
};

const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
};

const login = (req, res) => {
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;

    if (!username || !pass) {
        return res.status(400).json({ error: 'Allfields are required!' });
    }

    return Account.authenticate(username, pass, (err, account) => {
        if (err || !account) {
            return res.status(401).json({ error: 'Wrong username or password!' });
        }

        // session variables
        req.session.account = Account.toAPI(account);

        return res.json({ redirect: '/maker' });
    });
};

const signup = async (req, res) => {
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;
    const pass2 = `${req.body.pass2}`;

    if (!username || !pass || !pass2) {
        return res.status(400).json({error: 'All fields are required!'});
    }

    if (pass !== pass2) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    try {
        const hash = await Account.generateHash(pass);
        const newAccount = new Account({username, password: hash});
        await newAccount.save();

        // session variables
        req.session.account = Account.toAPI(newAccount);

        return res.json({ redirect: '/maker' });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Username already in use!' });
        }
        return res.status(500).json({ error: 'An error occured!' });
    }
};

// DOMOMAKER E
const changePassPage = (req, res) => {
    return res.render('reset');
}

// allows a current user to change their password
const changePassword = async (req, res) => {
    //req.session.account.username
    const username = req.session.account.username;
    const oldPass = `${req.body.oldPass}`;
    const pass2 = `${req.body.pass2}`;
    const pass3 = `${req.body.pass3}`;

    if ( !username || !oldPass || !pass2 || !pass3) {
        return res.status(400).json({error: 'All fields are required!'});
    }

    if ( pass2 !== pass3) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    try {
        await Account.authenticate(username, oldPass, (err, account) => {
            if (err || !account) {
                return res.status(401).json({ error: 'Old password is incorrect!' });
            }

            // I need a return statement here
            // but I think the right thing to do is to not
            // use this function?
        });
        const hash = await Account.generateHash(pass2);
        await Account.updateOne({ username: username }, { password: hash});

        
        await Account.authenticate(username, pass2, (err, account) => {
            if (err || !account) {
                console.log(err);
                return res.status(500).json({ error: 'An error occured!' });
            }

            // update session variables
            req.session.account = Account.toAPI(account);
            return res.json({ redirect: '/maker' });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occured!' });
    }
}

module.exports = {
    loginPage,
    login,
    logout,
    signup,
    changePassPage,
    changePassword
}
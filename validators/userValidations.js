const { isNull } = require("./nullcheck");

exports.isSignupRequestValidated = (req, res, next) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (isNull(firstName)) {
        return res.status(400).json({ error: 'Enter First Name' })
    }
    if (isNull(lastName)) {
        return res.status(400).json({ error: 'Enter Last Name' })
    }
    if (isNull(userName)) {
        return res.status(400).json({ error: 'Enter User Name' })
    }
    if (isNull(email)) {
        return res.status(400).json({ error: 'Enter Email' })
    }
    if (isNull(password)) {
        return res.status(400).json({ error: 'Enter password' })
    }
    next();
}

exports.isSignInRequestValidated = (req, res, next) => {
    const { email, password } = req.body;

    if (isNull(email)) {
        return res.status(400).json({ error: 'Enter Email' })
    }
    if (isNull(password)) {
        return res.status(400).json({ error: 'Enter Password' })
    }
    next();
}
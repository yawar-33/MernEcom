const { isNull } = require("./nullcheck");


exports.isValidCategory = (req, res, next) => {
    const { name, slug } = req.body;

    if (isNull(name)) {
        return res.status(400).json({ error: 'Enter Name' })
    }
    next();
}
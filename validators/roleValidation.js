// middle ware for role auth

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).send({ message: "User access denied" });
    }
    next();
};

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).send({ message: "Admin access denied" });

    }
    next();
};

exports.superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "super-admin") {
        return res.status(200).send({ message: "Super Admin access denied" });
    }
    next();
};

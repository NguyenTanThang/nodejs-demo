const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

const validateToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token){
        return res.json({
            msg: "You need a token to proceed",
            msg_type: "danger"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.setHeader("user_id", decoded.id);
        next();
    } catch (error) {
        return res.json({
            msg: "Invalid Token",
            msg_type: "danger"
        })
    }
}

module.exports = validateToken;
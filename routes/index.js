var express = require('express');
var router = express.Router();
var User =  require("../model/user");
var {validate, encrypt} = require("../config/encryption");
var jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        msg: "You are at the home page"
    })
});

router.post("/login", (req, res) => {
    let {email, password} = req.body;

    if (!email || !password){
        return res.json({
            msg: "Missing Credentials",
            msg_type: "danger"
        })
    }

    User.findOne({email})
    .then((existUser) => {
        if (!existUser){
            return res.json({
                msg: "This user does not exist",
                msg_type: "danger"
            })
        }

        if (validate(password, existUser.password)){
            const token = jwt.sign({id: existUser._id}, JWT_SECRET);
            res.setHeader("auth-token", token);
            return res.json({
                token,
                msg: "Logged in",
                msg_type: "success"
            })
        } else {
            return res.json({
                msg: "Wrong password",
                msg_type: "danger"
            })
        }
    })
})

router.post("/signup", (req, res) => {
    let {username, email, password} = req.body;

    if (!username || !email || !password){
        return res.json({
            msg: "Missing Credentials",
            msg_type: "danger"
        })
    }

    User.findOne({email})
    .then((existUser) => {
        if (existUser){
            return res.json({
                msg: "The user is already existed",
                msg_type: "danger"
            })
        }
        password = encrypt(password);

        new User({username, email, password})
        .save()
        .then(createdUser => {
            return res.json({
                createdUser,
                msg: "The user is already existed",
                msg_type: "danger"
            })
        })
    })
})

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get('/users/:user_id', function(req, res, next) {
    const user_id = req.params.user_id;

    User.findById(user_id)
    .then(user => {
        res.json({
            user
        })
    })
});

module.exports = router;

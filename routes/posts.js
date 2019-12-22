var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const user_id = req.header("user_id");

  res.json({
      msg: "You are at posts"
  })
});

module.exports = router;

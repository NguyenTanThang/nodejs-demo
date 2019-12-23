var express = require('express');
var router = express.Router();
const Post = require("../model/post");

/* GET users listing. */
router.get('/:user_id', (req, res, next) => {
  const user_id = req.params.user_id;

  Post.find({
      user_id
    })
    .then(posts => {
      return res.json(posts);
    })

});

router.post('/add/:user_id', (req, res, next) => {
  const user_id = req.params.user_id;
  const {
    title,
    body
  } = req.body;

  if (!title || !body) {
    return res.json({
      msg: "Missing Credentials",
      msg_type: "danger"
    })
  }

  new Post({
      title,
      body,
      user_id
    })
    .save()
    .then(createdPost => {
      res.json({
        createdPost,
        msg: "Succesfully created a new post",
        msg_type: "success"
      })
    })

});

router.put('/update/:post_id', (req, res, next) => {
  const post_id = req.params.post_id;
  const {
    title,
    body
  } = req.body;

  Post.findByIdAndUpdate(post_id, {
      title,
      body
    })
    .then(updatedPost => {
      Post.findById(post_id)
        .then(foundPost => {
          return res.json({
            updatedPost: foundPost,
            msg: "Succesfully updated a post",
            msg_type: "success"
          })
        })

    })
})

router.delete('/delete/:post_id', (req, res, next) => {
  const post_id = req.params.post_id;

  Post.findByIdAndDelete(post_id)
    .then(deletedPost => {
      return res.json({
        deletedPost,
        msg: "Succesfully deleted a post",
        msg_type: "success"
      })
    })
})

module.exports = router;
const Post = require("../models/Post");
const auth = require("../middleware/Auth");

module.exports = function(app) {
  //  get all posts

  app.get("/posts/", auth, (req, res) => {
    // res.send(req.query); // get all query like  ?name=nahid
    async function getPosts() {
      const result = await Post.find({});
      console.log("Total posts ....", result.length);
      return result;
    }

    getPosts()
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(err => console.log(err));
  });

  // get Post by Category

  app.get("/post/:category", (req, res) => {
    // res.send(req.params);

    async function getPostByIdAndCategory() {
      const result = await Post.find({ category: req.params.category });
      return result;
    }

    getPostByIdAndCategory()
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(err => console.log(err));
  });

  // create a post object and save it

  function validatePost(req, res, next) {
    if (!req.body.title) {
      return res.send(500, "Need a title");
    }
    if (!req.body.author) {
      return res.send(500, "Need a author");
    }
    if (!req.body.body) {
      return res.send(500, "Need a Post body");
    }
    if (!req.body.category) {
      return res.send(500, "Need a category");
    }
    next();
  }

  app.post("/post/new", auth, validatePost, (req, res) => {
    async function createPost() {
      console.log(req.body);
      const singlePost = new Post({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        category: req.body.category
      });
      const result = await singlePost.save();
      console.log(result);
      return result;
    }
    createPost()
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(err => console.log(err));
  });
};

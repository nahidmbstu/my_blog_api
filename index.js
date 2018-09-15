const express = require("express");
const mongoose = require("mongoose");

const app = express();

// import model

const Post = require("./models/Post");

// connect to remote database

mongoose
  .connect(
    "mongodb://nahid_hasan:mbstu2018@ds245512.mlab.com:45512/blog_db",
    { useNewUrlParser: true }
  )
  .then(() => console.log("successfully connected to mlab..."))
  .catch(err => console.log("mongodb connect error ....", err));

// create a post object and save it

// async function createPost() {
//   const singlePost = new Post({
//     title: "Bangladeshi movie in oscar stage",
//     author: "Zahid Hasan",
//     body: "Bangladeshi movie in oscar stage",
//     category: "economic",
//     likes: 22,
//     published: true
//   });

//   const result = await singlePost.save();
//   console.log(result);
// }

// createPost();

// retrive all posts

// async function getPosts() {
//   const result = await Post.find({
//     category: "economic",
//     likes: { $gte: 2, $lte: 22 } //  gre
//   })
//     .limit(10)
//     .sort({ likes: -1 }) // decending order ...
//     .select({ title: 1, body: 1, likes: 1, author: 1 });

//   console.log("Total posts ....", result.length);
//   console.log(result);
// }

// getPosts();

// simple get request

app.get("/", (req, res) => {
  res.send("Welcome to This api...MD.Nahid Hasan");
});

// how to get route parameter

app.get("/post/:id/:category", (req, res) => {
  res.send(req.params);
});

// how to get query parameter

app.get("/posts/", (req, res) => {
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

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listeing on  ... ${port}`));

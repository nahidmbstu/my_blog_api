const express = require("express");
const mongoose = require("mongoose");
const TokenGenerator = require("uuid-token-generator");
const bodyParser = require("body-parser");

const app = express();

// middlewares
app.use(bodyParser.json()); // to support JSON-encoded bodies  api / post man
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies / from websites

// import model

const Post = require("./models/Post");
const User = require("./models/User");

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

app.post("/auth/register", (req, res) => {
  const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
  let access_token = tokgen.generate();

  async function createUser() {
    const user = await User.find({
      email: req.body.email
    });

    console.log(user);

    if (user.length > 0) {
      return res.send(" Already Registered ").status(200);
    }

    const singleUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      access_token: access_token,
      isStaff: false
    });

    const result = await singleUser.save();
    return result;
  }

  createUser()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => console.log(err));
});

app.post("/auth/login", (req, res) => {
  async function LoginUser() {
    // find user

    const user = await User.find({
      access_token: req.body.access_token
    });

    console.log(user);
    // if not found return no access.

    if (user.length < 1) {
      return res.send(" No Registered User ").status(401);
    }

    if (user[0].access_token != req.body.access_token) {
      return res.send(" Invalid Token ").status(401);
    } else {
      return user;
    }
  }

  LoginUser()
    .then(result => {
      console.log(result);
      res.send(result).status(200);
    })
    .catch(err => console.log(err));
});

// how to get route parameter

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

app.get("/users", (req, res) => {
  // res.send(req.query); // get all query like  ?name=nahid
  async function getPosts() {
    const result = await User.find({});
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

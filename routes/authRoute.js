const TokenGenerator = require("uuid-token-generator");
const User = require("../models/User");

module.exports = function(app) {
  app.post("/auth/register", (req, res) => {
    const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
    let access_token = tokgen.generate();

    async function createUser() {
      const user = await User.find({
        email: req.body.email
      });

      console.log(user);

      if (user.length > 0) {
        return res.send(" Email Already Registered ").status(200);
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
        res.send(" User Successfully Registered ");
      })
      .catch(err => console.log(err));
  });

  app.post("/auth/login", (req, res) => {
    async function LoginUser() {
      // find user

      const user = await User.find({
        email: req.body.email,
        password: req.body.password
      });

      console.log(user);
      // if not found return no access.

      if (user.length < 1) {
        return res.send(" No Registered User ").status(401);
      }

      if (
        user[0].email != req.body.email &&
        user[0].password != req.body.password
      ) {
        return res.send(" Invalid Email or Password ").status(401);
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
};

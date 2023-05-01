const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ShoppingCart = db.cart;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { adminBoard } = require("./user.controller");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // Create a new shopping cart for the user
    const cart = new ShoppingCart({
      user: user._id,
      products: [],
      total: 0,
    });

    cart.save((err, cart) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // Save the reference of the cart to the user's shoppingCart property
      user.shoppingCart = cart._id;

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);

            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

// exports.getCurrentUser = (req, res) => {
//   // User.findById(req.userId)
//   const userId = mongoose.Types.ObjectId(req.userId);
//   console.log(userId);

//   User.findById(userId)
//     .populate("roles", "-__v")
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var authorities = [];

//       for (let i = 0; i < user.roles.length; i++) {
//         authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
//       }
//       res.status(200).send({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         roles: authorities,
//         accessToken: token,
//       });
//     });
// };

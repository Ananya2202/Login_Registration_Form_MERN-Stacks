const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ remail: req.body.remail }).then(user => {
      if (user) {
        return res.status(400).json({ remail: "Email already exists" });
      } else {
        const newUser = new User({
          rname: req.body.rname,
          rcontact: req.body.rcontact,
          rcountry: req.body.rcountry,
          remail: req.body.remail,
          rpassword: req.body.rpassword
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.rpassword, salt, (err, hash) => {
            if (err) throw err;
            newUser.rpassword = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const remail = req.body.remail;
    const rpassword = req.body.rpassword;
  // Find user by email
    User.findOne({ remail }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ remailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(rpassword, user.rpassword).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            rid: user.rid,
            rname: user.rname
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;
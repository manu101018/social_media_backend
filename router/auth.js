const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controller/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get('/status',authController.status);

module.exports = router;

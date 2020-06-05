const express = require('express');
const router = express.Router();
const ShopModel = require('../models/Shop.model');
const UserModel = require('../models/User.model');

router.get('/accept', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('auth/accept.hbs');
  }
});

router.get('/profile', (req, res) => {
    // res.render('users/profile.hbs', {userData: req.session.loggedInUser});
    ShopModel.find()
    .then((pets) => {
      res.render('users/profile.hbs', {pets});
    })
    .catch(() => {
      console.log('something went wrong');
    });
});

router.post('/profile/:id/delete', (req, res, next) => {
  ShopModel.findByIdAndDelete(req.params.id)
  .then((response) => {
      res.redirect('/profile');
  })
  .catch(() => {
      res.send('something went wrong');
  });
});

module.exports = router;
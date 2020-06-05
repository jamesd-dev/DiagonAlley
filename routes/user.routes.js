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

    UserModel.find()
    .populate('ownedItems')
    .then((items) => {
      res.render('users/profile.hbs', {items});
    })
    .catch(() => {
      console.log('something went wrong');
    });
});

router.post('/profile/:id/delete', (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id)
  .then((response) => {
      res.redirect('/profile');
  })
  .catch(() => {
      res.send('something went wrong');
  });
});

module.exports = router;
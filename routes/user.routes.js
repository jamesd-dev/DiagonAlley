const express = require('express');
const router = express.Router();
const ShopModel = require('../models/Shop.model');
const UserModel = require('../models/User.model');

//acceptance letter
router.get('/accept', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('users/accept.hbs', {userData: req.session.loggedInUser});
  }
});

//profile
router.get('/profile', (req, res) => {

    UserModel.findById(req.session.loggedInUser._id)
    .populate('ownedItems')
    .then((items) => {
      const ownedItems = items.ownedItems;
      const user = req.session.loggedInUser;
      res.render('users/profile.hbs', {ownedItems, user});
    })
    .catch(() => {
      console.log('something went wrong');
    });
});

//deleting things from profile
router.post('/profile/:itemId/delete', (req, res, next) => {
  const userId = req.session.loggedInUser._id;
  const itemId = req.params.itemId;
  UserModel.updateOne({_id: userId}, {$pullAll: {ownedItems: [{_id: req.params.itemId}]}})
  .then(() => {
    ShopModel.updateOne({_id: itemId}, {$pullAll: {owners: [{_id: userId}]}})
    .then(() => {
      console.log('deleted');
      res.redirect(`/profile`);
    })
    .catch(() => {
      console.log('failed to remove owner from object');
      res.redirect(`/profile`);
    });
  })
  .catch((r) => {
    console.log('failed to remove item from profile', r);
    res.redirect(`/profile`);
  })
});

module.exports = router;
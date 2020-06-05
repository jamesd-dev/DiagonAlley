const express = require('express');
const router = express.Router();
const ShopModel = require('../models/Shop.model');
const UserModel = require('../models/User.model');

/* GET home page */
router.get('/', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    res.redirect('/profile');
  }
});
router.get('/profile/books', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('shop/books.hbs');
  }
});
router.get('/profile/pets', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    ShopModel.find()
    .then((pets) => {
      res.render('shop/pets.hbs', {pets});
    })
    .catch(() => {
      console.log('something went wrong');
    });
  }
});
router.get('/profile/potions', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('shop/potions.hbs');
  }
});
router.get('/profile/wands', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('shop/wands.hbs');
  }
});

router.post('/profile/pets/:id/delete', (req, res, next) => {
  ShopModel.findByIdAndDelete(req.params.id)
  .then((response) => {
      res.redirect('/profile/pets');
  })
  .catch(() => {
      res.send('something went wrong');
  });
});

router.post('/profile/pets/:id/add', (req, res, next) => {
  let username = req.session.loggedInUser.username;
  UserModel.findOneAndUpdate({username}, {$push: {ownedItems: [req.params.id]}})
  .then(() => {
    res.redirect('/profile/pets');
  })
  .catch(() => {
    console.log('failed to add pet to profile');
    res.redirect('/profile/pets');
  })
});

router.get('/profile/create', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('shop/create.hbs');
  }
});

router.post('/profile/create', (req, res, next) => {
  const {icon, name, description, itemType} = req.body;

  ShopModel.create({icon, name, description, itemType})
  .then((response) => {
      res.redirect('/profile/pets');
  })
  .catch (() => {
      res.send('something went wrong');
  });
});

router.get('/accept', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('users/accept.hbs', {userData: req.session.loggedInUser});
  }
});

module.exports = router;

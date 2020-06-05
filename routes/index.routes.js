const express = require('express');
const router = express.Router();
const ShopModel = require('../models/Shop.model');

/* GET home page */
router.get('/', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    res.redirect('/profile');
  }
});
router.get('/profile/books', (req, res) => {
  res.render('shop/books.hbs');
});
router.get('/profile/pets', (req, res) => {
  ShopModel.find()
  .then((pets) => {
    res.render('shop/pets.hbs', {pets});
  })
  .catch(() => {
    console.log('something went wrong');
  });
});
router.get('/profile/potions', (req, res) => {
  res.render('shop/potions.hbs');
});
router.get('/profile/wands', (req, res) => {
  res.render('shop/wands.hbs');
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

router.get('/profile/create', (req, res) => {
  res.render('shop/create.hbs');
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

module.exports = router;

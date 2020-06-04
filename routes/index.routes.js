const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('auth/home.hbs', {layout: false});
});
router.get('/profile/books', (req, res) => {
  res.render('shop/books.hbs');
});
router.get('/profile/pets', (req, res) => {
  res.render('shop/pets.hbs');
});
router.get('/profile/potions', (req, res) => {
  res.render('shop/potions.hbs');
});
router.get('/profile/wands', (req, res) => {
  res.render('shop/wands.hbs');
});

module.exports = router;

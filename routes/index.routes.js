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

// One generic shop with its contents defined by it's type
router.get('/shop/:shopType', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('/', {layout: false});
  } else {

    const userId = req.session.loggedInUser._id;

    // get shop type
    const shopType = req.params.shopType;
    // create shop name from shop type
    let shopName = 'Untitled';
    switch (req.params.shopType) {
      case 'pet' :
        shopName = 'Eeylops Owl Emporium';
        break;
      case 'book' :
        shopName = 'Flourish and Blotts';
        break;
      case 'potion' :
        shopName = 'Mr Mulpepper\'s Apothecary';
        break;
    }

    // get all items of shop type
    ShopModel.find({itemType: shopType})
    .then((items) => {
      // sets owned property to true on item if this user already has it
      const toggledItems = items.map((item) => {
        if(item.owners.includes(userId)) {
          item.owned = true;
        } else {
          item.owned = false;
        }
        return item;
      });
      // owned property is used to set a class name and alter the state of html if an item is owned or not.
      res.render('shop/shop.hbs', {userData: req.session.loggedInUser, type: shopType, name: shopName, items: toggledItems});
    })
    .catch(() => {
      // replace list of items with an error
      res.render('shop/shop.hbs', {errorMessage: 'Couldn\'t find shop items'});
    });
  }
});

router.post('/shop/:shopType/:itemId/add', (req, res, next) => {
  const userId = req.session.loggedInUser._id;
  const itemId = req.params.itemId;
  UserModel.findOneAndUpdate({_id: userId}, {$push: {ownedItems: [{_id: itemId}]}})
  .then(() => {
    ShopModel.findOneAndUpdate({_id: itemId}, {$push: {owners: [{_id: userId}]}})
    .then(() => {
      res.redirect(`/shop/${req.params.shopType}`);
    })
    .catch(() => {
      console.log('failed to add user to item owners');
      res.redirect(`/shop/${req.params.shopType}`);
    });
  })
  .catch(() => {
    console.log('failed to add item to profile');
    res.redirect(`/shop/${req.params.shopType}`);
  });
});

router.post('/shop/:shopType/:itemId/delete', (req, res, next) => {
  const userId = req.session.loggedInUser._id;
  const itemId = req.params.itemId;
  UserModel.updateOne({_id: userId}, {$pullAll: {ownedItems: [{_id: req.params.itemId}]}})
  .then(() => {
    ShopModel.updateOne({_id: itemId}, {$pullAll: {owners: [{_id: userId}]}})
    .then(() => {
      console.log('deleted');
      res.redirect(`/shop/${req.params.shopType}`);
    })
    .catch(() => {
      console.log('failed to remove owner from object');
      res.redirect(`/shop/${req.params.shopType}`);
    });
  })
  .catch((r) => {
    console.log('failed to remove item from profile', r);
    res.redirect(`/shop/${req.params.shopType}`);
  })
});

router.get('/shop/:shopType/create', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {

    // get shop type
    const shopType = req.params.shopType;
    // create shop name from shop type
    let shopName = 'Untitled';
    switch (req.params.shopType) {
      case 'pet' :
        shopName = 'Eeylops Owl Emporium';
        break;
      case 'book' :
        shopName = 'Flourish and Blotts';
        break;
      case 'potion' :
        shopName = 'Mr Mulpepper\'s Apothecary';
        break;
    }

    res.render('shop/create.hbs', {type: shopType, name: shopName});
  }
});

router.post('/shop/:shopType/create', (req, res, next) => {
  const {name, description} = req.body;
  const icon = 'fas fa-star'; // default for now until we work out how to display the icons as options
  const itemType = req.params.shopType;
  const username = req.session.loggedInUser.username;

  ShopModel.create({icon, name, description, itemType, author: username})
  .then((response) => {
    res.redirect(307, `/shop/${req.params.shopType}/${response._id}/add`);
  })
  .catch ((response) => {
    res.redirect(`/shop/${req.params.shopType}/create`);
    console.log('failed to create new item: ', response);
  });
});

router.get('/sorting-hat', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/login.hbs', {layout: false});
  } else {
    res.render('users/sorting-hat.hbs');
  }
});

module.exports = router;

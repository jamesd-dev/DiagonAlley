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
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
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
      case 'cloak' :
        shopName = 'Madam Malkin\'s Robes';
        break;
      default:
        res.redirect('/not-found');
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
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
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
}
});

router.post('/shop/:shopType/:itemId/delete', (req, res, next) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
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
  });
}
});

//updating created objects
router.get('/shop/:shopType/:itemId/update', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
  ShopModel.findById(req.params.itemId)
  .then((items) => {
      res.render('shop/update.hbs', {items});
  })
  .catch(() => {
      res.send('something went wrong');
  });
  }
});

//updating created objects
router.post('/shop/:shopType/:itemId/update', (req, res, next) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
  const itemId = req.params.itemId; 
  const {name, description} = req.body;
       ShopModel.findByIdAndUpdate({_id: itemId}, {$set: {name, description}})
       .then((response) => {
         res.redirect(`/shop/${req.params.shopType}`);
       })
       .catch(() => {
         res.redirect(`/shop/${req.params.shopType}`);
       });
      }
     });

router.get('/shop/:shopType/create', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
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
      case 'cloak' :
        shopName = 'Madam Malkin\'s Robes';
        break;  
    }

    res.render('shop/create.hbs', {type: shopType, name: shopName});
  }
});

router.post('/shop/:shopType/create', (req, res, next) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
  const {name, description} = req.body;
  const icon = 'fas fa-star'; // default for now until we work out how to display the icons as options
  const itemType = req.params.shopType;
  const username = req.session.loggedInUser.username;
  const shopType = req.params.shopType;

  const myRegex = new RegExp(/^[a-zA-Z]+/);
  //cheching if name is only letters, if not rendering error
  if (!myRegex.test(name)) {
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
      case 'cloak' :
        shopName = 'Madam Malkin\'s Robes';
        break;  
    }
      res.status(500)
      .render('shop/create.hbs', {type: shopType, name: shopName, errorMessage: 'Please use letters only'});
      return; 
  }
  //checking if description is only letters, if not rendering error
  if (!myRegex.test(description)) {
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
      case 'cloak' :
        shopName = 'Madam Malkin\'s Robes';
        break;  
    }
      res.status(500)
      .render('shop/create.hbs', {type: shopType, name: shopName, errorMessage: 'Please use letters only'});
      return; 
  }
  else {

  ShopModel.create({icon, name, description, itemType, author: username})
  .then((response) => {
    res.redirect(307, `/shop/${req.params.shopType}/${response._id}/add`);
  })
  .catch ((response) => {
    res.redirect(`/shop/${req.params.shopType}/create`);
    console.log('failed to create new item: ', response);
  });
}
  }
});
// window.onbeforeunload = function() { return "Your work will be lost."; };

router.get('/sorting-hat', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    if (req.session.loggedInUser.hogwartsHouse == 'unsorted') {
      res.render('users/sorting-hat.hbs');
    } else {
      res.redirect(`/sorting-hat/${req.session.loggedInUser.hogwartsHouse}`);
    }
  }
});

router.get('/sorting-hat/:house', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    if (req.session.loggedInUser.hogwartsHouse == 'unsorted') {
      req.session.loggedInUser.hogwartsHouse = req.params.house;
      UserModel.findByIdAndUpdate({_id: req.session.loggedInUser._id}, {$set: {hogwartsHouse: req.params.house}})
      .then((response) => {
        UserModel.find({_id: req.session.loggedInUser._id}).then((response) => {console.log(response)});
      });
    }

    res.render(`users/sorting-hat-${req.session.loggedInUser.hogwartsHouse}.hbs`);
  }
});

router.get('/wands', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    res.render(`shop/wand-shop.hbs`, {user: req.session.loggedInUser});
  }
});

router.get('/search', (req, res) => {
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {
    res.render('shop/search.hbs');
  }
});


module.exports = router;

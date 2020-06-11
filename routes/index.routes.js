const express = require('express');
const router = express.Router();
const ShopModel = require('../models/Shop.model');
const UserModel = require('../models/User.model');

/* GET home page */
router.get('/', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    res.redirect('/profile');
  }
});

// One generic shop with its contents defined by it's type
router.get('/shop/:shopType', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    const userId = req.session.loggedInUser._id;

    // get shop type
    const shopType = req.params.shopType;
    // create shop name from shop type
    let shopName = 'Untitled';
    switch (req.params.shopType) {
      case 'pet':
        shopName = 'Eeylops Owl Emporium';
        break;
      case 'book':
        shopName = 'Flourish and Blotts';
        break;
      case 'potion':
        shopName = "Mr Mulpepper's Apothecary";
        break;
      case 'cloak':
        shopName = "Madam Malkin's Robes";
        break;
      default:
        res.redirect('/not-found');
    }

    // get all items of shop type
    ShopModel.find({ itemType: shopType })
      .then(items => {
        // sets owned property to true on item if this user already has it
        UserModel.findById(userId).then((user) => {
          const toggledItems = items.map(item => {
              if (user.ownedItems.includes(item._id)) {
                item.owned = true;
              } else {
                item.owned = false;
              }
              return item;
          });

          // owned property is used to set a class name and alter the state of html if an item is owned or not.
          res.render('shop/shop.hbs', { userData: req.session.loggedInUser, type: shopType, name: shopName, items: toggledItems });

        })
        .catch(() => {console.log('failed to find user');});
      })
      .catch(() => {
        // replace list of items with an error
        res.render('shop/shop.hbs', { errorMessage: "Couldn't find shop items" });
      });
  }
});

router.post('/shop/:shopType/:itemId/add', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
    // Step 1 get user and item id
    const userId = req.session.loggedInUser._id;
    const itemId = req.params.itemId;

    // Step 2 get user and item
    let getUser = UserModel.findById(userId);
    let getItem = ShopModel.findById(itemId);

    let userMoney = 0;
    let itemCost = 1;

    // Step 3 getting user money and item cost from database
    let getValues = Promise.all([getUser, getItem])
      .then(values => {
        userMoney = values[0].money;
        itemCost = values[1].money;
      })
      .then(() => {
        // Step 4 calculate values
        let total = userMoney - itemCost;
        console.log(userMoney, itemCost, total);

        if (total >= 0) {
          // Step 5 update databases
          let updateUserMoney = UserModel.findOneAndUpdate({ _id: userId }, { money: total });
          let updateUserItems = UserModel.findOneAndUpdate({ _id: userId }, { $push: { ownedItems: [{ _id: itemId }] } });

          Promise.all([updateUserMoney, updateUserItems])
            .then(() => {
              // keep session info up to date
              UserModel.findById(userId)
                .then(user => {
                  req.session.loggedInUser = user;

                  // redirect to page
                  // has to update session first
                  res.redirect(`/shop/${req.params.shopType}`);
                })
                .catch(() => {
                  console.log('failed to update user session');
                });
            })
            .catch(() => {
              console.log('failed to get update user money and item and user dbs');
            });
        } else {
          // user doesn't have enough money
          res.redirect('/profile');
        }
      })
      .catch(() => {
        console.log('failed to get user money or item cost');
      });
  }
});

router.post('/shop/:shopType/:itemId/delete', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
    // Step 1 get user and item id
    const userId = req.session.loggedInUser._id;
    const itemId = req.params.itemId;

    // Step 2 get user and item
    let getUser = UserModel.findById(userId);
    let getItem = ShopModel.findById(itemId);

    let userMoney = 0;
    let itemCost = 1;

    // Step 3 getting user money and item cost from database
    let getValues = Promise.all([getUser, getItem])
      .then(values => {
        userMoney = values[0].money;
        itemCost = values[1].money;
      })
      .then(() => {
        // Step 4 calculate values
        let total = userMoney + itemCost;
        console.log(userMoney, itemCost, total);

        if (total >= 0) {
          // Step 5 update databases
          let updateUserMoney = UserModel.findOneAndUpdate({ _id: userId }, { money: total });
          let updateUserItems = UserModel.findOneAndUpdate({ _id: userId }, { $pullAll: { ownedItems: [{ _id: itemId }] } });

          Promise.all([updateUserMoney, updateUserItems])
            .then(() => {
              // keep session info up to date
              UserModel.findById(userId)
                .then(user => {
                  req.session.loggedInUser = user;

                  // redirect to page
                  // has to update session first
                  res.redirect(`/shop/${req.params.shopType}`);
                })
                .catch(() => {
                  console.log('failed to update user session');
                });
            })
            .catch(() => {
              console.log('failed to get update user money and item and user dbs');
            });
        } else {
          // user doesn't have enough money
          // res.render('shop/shop.hbs', {errorMessage: "You don't have enought money"});
          res.render({ errorMessage: "You don't have enought money" });
          res.redirect(`/shop/${req.params.shopType}`);
        }
      })
      .catch(() => {
        console.log('failed to get user money or item cost');
      });
  }
});

//updating created objects
router.get('/shop/:shopType/:itemId/update', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    ShopModel.findById(req.params.itemId)
      .then(items => {
        res.render('shop/update.hbs', { items });
      })
      .catch(() => {
        res.send('something went wrong');
      });
  }
});

//updating created objects
router.post('/shop/:shopType/:itemId/update', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
    const itemId = req.params.itemId;
    const { name, description } = req.body;
    ShopModel.findByIdAndUpdate({ itemId }, { $set: { name, description } })
      .then(response => {
        res.redirect(`/shop/${req.params.shopType}`);
      })
      .catch(() => {
        res.redirect(`/shop/${req.params.shopType}`);
      });
  }
});

router.get('/shop/:shopType/create', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    // get shop type
    const shopType = req.params.shopType;
    // create shop name from shop type
    let shopName = 'Untitled';
    switch (req.params.shopType) {
      case 'pet':
        shopName = 'Eeylops Owl Emporium';
        break;
      case 'book':
        shopName = 'Flourish and Blotts';
        break;
      case 'potion':
        shopName = "Mr Mulpepper's Apothecary";
        break;
      case 'cloak':
        shopName = "Madam Malkin's Robes";
        break;
      default:
        res.redirect('/not-found');
    }

    res.render('shop/create.hbs', { type: shopType, name: shopName });
  }
});

router.post('/shop/:shopType/create', (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs');
  } else {
    const { name, description } = req.body;
    const icon = 'fas fa-star'; // default for now until we work out how to display the icons as options
    const itemType = req.params.shopType;
    const username = req.session.loggedInUser.username;
    const shopType = req.params.shopType;

    const myRegex = new RegExp(/^[a-zA-Z]+/);
    //cheching if name is only letters, if not rendering error
    if (!myRegex.test(name)) {
      let shopName = 'Untitled';
      switch (req.params.shopType) {
        case 'pet':
          shopName = 'Eeylops Owl Emporium';
          break;
        case 'book':
          shopName = 'Flourish and Blotts';
          break;
        case 'potion':
          shopName = "Mr Mulpepper's Apothecary";
          break;
        case 'cloak':
          shopName = "Madam Malkin's Robes";
          break;
        default:
          res.redirect('/not-found');
      }
      res.status(500).render('shop/create.hbs', { type: shopType, name: shopName, errorMessage: 'Please use letters only' });
      return;
    }
    //checking if description is only letters, if not rendering error
    if (!myRegex.test(description)) {
      let shopName = 'Untitled';
      switch (req.params.shopType) {
        case 'pet':
          shopName = 'Eeylops Owl Emporium';
          break;
        case 'book':
          shopName = 'Flourish and Blotts';
          break;
        case 'potion':
          shopName = "Mr Mulpepper's Apothecary";
          break;
        case 'cloak':
          shopName = "Madam Malkin's Robes";
          break;
        default:
          res.redirect('/not-found');
      }
      res.status(500).render('shop/create.hbs', { type: shopType, name: shopName, errorMessage: 'Please use letters only' });
      return;
    } else {
      ShopModel.create({ icon, name, description, itemType, money: 12, author: username })
        .then(response => {
          res.redirect(307, `/shop/${req.params.shopType}/${response._id}/add`);
        })
        .catch(response => {
          console.log('failed to create new item: ', response);
          res.redirect(`/shop/${req.params.shopType}/create`);
        });
    }
  }
});

router.get('/sorting-hat', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
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
    res.render('auth/home.hbs', { layout: false });
  } else {
    if (req.session.loggedInUser.hogwartsHouse == 'unsorted') {
      req.session.loggedInUser.hogwartsHouse = req.params.house;
      UserModel.findOneAndUpdate({ _id: req.session.loggedInUser._id }, { $set: { hogwartsHouse: req.params.house } }).then(response => {
        UserModel.find({ _id: req.session.loggedInUser._id }).then(response => {
          console.log(response);
        });
      });
    }

    res.render(`users/sorting-hat-${req.session.loggedInUser.hogwartsHouse}.hbs`);
  }
});

router.get('/wands', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    res.render(`shop/wand-shop.hbs`, { user: req.session.loggedInUser });
  }
});

router.post('/wands/buy', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    const { date, wish, flexi } = req.body;
    let wood = 'error';
    let core = 'error';
    let flexibility = 'error';
    let month = parseInt(date.split('-')[1]);
    let day = parseInt(date.split('-')[2]);

    if (month === 12 && day >= 24) {
      wood = 'Birch';
    } else if (month === 1 && day <= 20) {
      wood = 'Birch';
    } else if (month === 1 && day >= 21) {
      wood = 'Rowan';
    } else if (month === 2 && day <= 17) {
      wood = 'Rowan';
    } else if (month === 2 && day >= 18) {
      wood = 'Ash';
    } else if (month === 3 && day <= 17) {
      wood = 'Ash';
    } else if (month === 3 && day >= 18) {
      wood = 'Alder';
    } else if (month === 4 && day <= 14) {
      wood = 'Alder';
    } else if (month === 4 && day >= 15) {
      wood = 'Willow';
    } else if (month === 5 && day <= 12) {
      wood = 'Willow';
    } else if (month === 5 && day >= 13) {
      wood = 'Hawthorn';
    } else if (month === 6 && day <= 9) {
      wood = 'Hawthorn';
    } else if (month === 6 && day >= 16) {
      wood = 'Oak';
    } else if (month === 7 && day <= 7) {
      wood = 'Oak';
    } else if (month === 7 && day >= 8) {
      wood = 'Holly';
    } else if (month === 8 && day <= 4) {
      wood = 'Holly';
    } else if (month === 8 && day >= 5) {
      wood = 'Hazel';
    } else if (month === 9 && day <= 1) {
      wood = 'Hazel';
    } else if (month === 9 && day >= 2) {
      wood = 'Vine';
    } else if (month === 9 && day <= 29) {
      wood = 'Vine';
    } else if (month === 9 && day >= 30) {
      wood = 'Ivy';
    } else if (month === 10 && day <= 27) {
      wood = 'Ivy';
    } else if (month === 10 && day >= 28) {
      wood = 'Reed';
    } else if (month === 11 && day <= 24) {
      wood = 'Reed';
    } else if (month === 11 && day >= 25) {
      wood = 'Elder';
    } else if (month === 12 && day <= 23) {
      wood = 'Elder';
    }

    if (wish === 'Power') {
      core = 'Dragon Heartstring';
    } else if (wish === 'Love') {
      core = 'Unicorn hair';
    } else if (wish === 'Courage') {
      core = 'Phoenix Feather';
    }

    if (flexi < 20) {
      flexibility = 'brittle';
    } else if (flexi < 30) {
      flexibility = 'unyielding';
    } else if (flexi < 40) {
      flexibility = 'rigid';
    } else if (flexi < 50) {
      flexibility = 'somewhat firm';
    } else if (flexi < 60) {
      flexibility = 'a little flexible';
    } else if (flexi < 70) {
      flexibility = 'quite giving';
    } else if (flexi < 80) {
      flexibility = 'springy';
    } else if (flexi < 100) {
      flexibility = 'whippy';
    }

    let length = Math.ceil(Math.random() * 5) + 7;

    res.render(`shop/wand-result.hbs`, { user: req.session.loggedInUser, wood, core, flexibility, length });
  }
});

router.get('/search', (req, res) => {
  if (!req.session.loggedInUser) {
    res.render('auth/home.hbs', { layout: false });
  } else {
    res.render('shop/search.hbs');
  }
});

module.exports = router;

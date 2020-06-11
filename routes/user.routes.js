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
  if(!req.session.loggedInUser) {
    res.render('auth/home.hbs', {layout: false});
  } else {

    UserModel.findById(req.session.loggedInUser._id)
    .populate('ownedItems')
    .then((items) => {
      const user = req.session.loggedInUser;

      let sortedItems = items.ownedItems.reduce((collection, object) => {
        let itemType = object.itemType[0].toUpperCase() + object.itemType.substring(1) + 's';
        if(collection[itemType]) {collection[itemType].push(object);}
        else {
          collection[itemType] = [];
          collection[itemType].push(object);
        }
        return collection;
      }, {});

      let house = '';
      console.log(req.session.loggedInUser.hogwartsHouse);
      switch (req.session.loggedInUser.hogwartsHouse) {
        case 'gryffindor':
          house = 'https://i.imgur.com/UF0PCnX.png';
          break;
        case 'slytherin':
          house = 'https://i.imgur.com/bv26wuu.png';
          break;
        case 'hufflepuff':
          house = "https://i.imgur.com/ONkMuUh.png";
          break;
        case 'ravenclaw':
          house = 'https://i.imgur.com/UANFH1L.png';
          break; 
        default: house = 'https://i.imgur.com/7H86YqI.png';
      }

      console.log(house);

      res.render('users/profile.hbs', {sortedItems, user, house});
    })
    .catch(() => {
      console.log('something went wrong');
    });
  }
});

//deleting things from profile
router.post('/profile/:itemId/delete', (req, res, next) => {
//   if(!req.session.loggedInUser) {
//     res.render('auth/login.hbs', {layout: false});
//   } else {
//   const userId = req.session.loggedInUser._id;
//   const itemId = req.params.itemId;
//   UserModel.updateOne({_id: userId}, {$pullAll: {ownedItems: [{_id: req.params.itemId}]}})
//   .then(() => {
//     console.log('deleted');
//     res.redirect(`/profile`);
//   })
//   .catch((r) => {
//     console.log('failed to remove item from profile', r);
//     res.redirect(`/profile`);
//   });
// }

if (!req.session.loggedInUser) {
  res.render('auth/home.hbs', {layout: false});
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
                res.redirect(`/profile`);
              })
              .catch(() => {
                console.log('failed to update user session');
              });
          })
          .catch(() => {
            console.log('failed to get update user money and item and user dbs');
          });
      
    })
    .catch(() => {
      console.log('failed to get user money or item cost');
    });
}
});

module.exports = router;
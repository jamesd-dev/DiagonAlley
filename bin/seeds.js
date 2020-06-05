let ShopModel = require('../models/Shop.model');
//const mongoose = require('mongoose');
//require('../configs/db.config');

let pets = [{
  icon: "fas fa-otter",
  name: 'Otter',
  itemType: 'pet',
  description: 'The most ferocious kind of underwater cat, likes fish, cuddles and the blood of the innocent'
},
{
  icon: "fas fa-hippo",
  name: 'Hippo',
  itemType: 'pet',
  description: 'It\'s just a fat, wet dog, they\'ll be sure to let you keep it.'
},
{
  icon: "fas fa-cat",
  name: 'Cat',
  itemType: 'pet',
  description: 'Essentially an abusive relationship with fur'
},
{
  icon: "fas fa-spider",
  name: 'Spider',
  itemType: 'pet',
  description: 'Ew, gross. Dem legs tho...'
},
{
  icon: "fas fa-kiwi-bird",
  name: 'Kiwi Bird',
  itemType: 'pet',
  description: 'Not a kiwi, not really a bird either. It\'s an existential crisis with a beak'
},
{
  icon: "fas fa-frog",
  name: 'Frog',
  itemType: 'pet',
  description: 'Solidify your reputation as a loser, be the king/queen of the bullied kids with your very own frog'
},
{
  icon: "fas fa-dragon",
  name: 'Dragon',
  itemType: 'pet',
  description: 'Definitely not allowed. Do it.'
},
{
  icon: "fas fa-crow",
  name: 'Crow',
  itemType: 'pet',
  description: 'Excellent for cleaning up all of that pesky carrion left over from slaying your enemies'
},
{
  icon: "fas fa-fish",
  name: 'Fish',
  itemType: 'pet',
  description: 'It\'s looking for it\'s dad'
},
{
  icon: "fas fa-paw",
  name: 'Dog',
  itemType: 'pet',
  description: 'Like a cat, except it actually likes you'
}];

let dataBase = ShopModel.create(pets)
.then((response) => {
  console.log('populated shop database');
})
.catch((response) => {
  console.log('something went wrong: ', response);
});

// don't need to close database as seed is run automatically by app.js
// Promise.all([dataBase]) 
// .then(() => {
//   mongoose.connection.close();
// })
// .catch(() => {
//   console.log('Something went wrong');
// });
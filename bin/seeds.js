let ShopModel = require('../models/Shop.model');
const mongoose = require('mongoose');
require('../configs/db.config');

let pets = [{
  icon: '',
  name: 'Otter',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Hippo',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Cat',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Spider',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Kiwi Bird',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Frog',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Dragon',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Crow',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Fish',
  itemType: 'pet',
  author: ''
},
{
  icon: '',
  name: 'Dog',
  itemType: 'pet',
  author: ''
}];

let dataBase = ShopModel.create(pets)
.then((response) => {
  console.log('working', response);
})
.catch(() => {
  console.log('something went wrong');
});

Promise.all([dataBase]) 
.then(() => {
  mongoose.connection.close();
})
.catch(() => {
  console.log('Something went wrong');
});
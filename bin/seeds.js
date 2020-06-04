let ShopModel = require('../models/Shop.model');
const mongoose = require('mongoose');
require('../configs/db.config');

let pets = [
  {
    icon: '<i class="fas fa-cat"></i>',
    name: 'Cat',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-otter"></i>',
    name: 'Otter',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-hippo"></i>',
    name: 'Hippo',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-spider"></i>',
    name: 'Spider',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-kiwi-bird"></i>',
    name: 'Kiwi Bird',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-frog"></i>',
    name: 'Frog',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-dragon"></i>',
    name: 'Dragon',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-crow"></i>',
    name: 'Crow',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-fish"></i>',
    name: 'Fish',
    itemType: 'pet',
    author: ''
  },
  {
    icon: '<i class="fas fa-paw"></i>',
    name: 'Dog',
    itemType: 'pet',
    author: ''
  }
];

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
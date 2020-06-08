let ShopModel = require('../models/Shop.model');
//const mongoose = require('mongoose');
//require('../configs/db.config');

let pets = [{
  icon: 'fas fa-otter',
  name: 'Otter',
  itemType: 'pet',
  description: 'The most ferocious kind of underwater cat, likes fish, cuddles and the blood of the innocent'
},
{
  icon: 'fas fa-hippo',
  name: 'Hippo',
  itemType: 'pet',
  description: 'It\'s just a fat, wet dog, they\'ll be sure to let you keep it.'
},
{
  icon: 'fas fa-cat',
  name: 'Cat',
  itemType: 'pet',
  description: 'Essentially an abusive relationship with fur'
},
{
  icon: 'fas fa-spider',
  name: 'Spider',
  itemType: 'pet',
  description: 'Ew, gross. Dem legs tho...'
},
{
  icon: 'fas fa-kiwi-bird',
  name: 'Kiwi Bird',
  itemType: 'pet',
  description: 'Not a kiwi, not really a bird either. It\'s an existential crisis with a beak'
},
{
  icon: 'fas fa-frog',
  name: 'Frog',
  itemType: 'pet',
  description: 'Solidify your reputation as a loser, be the king/queen of the bullied kids with your very own frog'
},
{
  icon: 'fas fa-dragon',
  name: 'Dragon',
  itemType: 'pet',
  description: 'Definitely not allowed. Do it.'
},
{
  icon: 'fas fa-crow',
  name: 'Crow',
  itemType: 'pet',
  description: 'Excellent for cleaning up all of that pesky carrion left over from slaying your enemies'
},
{
  icon: 'fas fa-fish',
  name: 'Fish',
  itemType: 'pet',
  description: 'It\'s looking for it\'s dad'
},
{
  icon: 'fas fa-paw',
  name: 'Dog',
  itemType: 'pet',
  description: 'Like a cat, except it actually likes you'
}];

let books = [{
  icon: 'fas fa-book',
  name: 'A History of Magic, by Adalbert Waffling',
  itemType: 'book',
  description: 'Where it all began'
},
{
  icon: 'fas fa-book',
  name: 'A Beginner\'s Guide to Transfiguration, by Emeric Switch',
  itemType: 'book',
  description: 'Everything you need to know about Transfiguration'
},
{
  icon: 'fas fa-book-dead',
  name: 'One Thousand Magical Herbs and Fungi, by Phyllida Spore',
  itemType: 'book',
  description: 'A guide to the magical Flora surrounding us'
},
{
  icon: 'fas fa-book-dead',
  name: 'Magical Drafts and Potions, by Arsenius Jigger',
  itemType: 'book',
  description: 'Your guide to potions'
},
{
  icon: 'fas fa-book-dead',
  name: 'Fantastic Beasts and Where to Find Them, by Newt Scamander',
  itemType: 'book',
  description: 'Where to find great beasts'
},
{
  icon: 'fas fa-book-dead',
  name: 'The Dark Forces: A Guide to Self-Protection, by Quentin Trimble',
  itemType: 'book',
  description: 'How to protect yourself from The Dark Forces'
},
{
  icon: 'fas fa-book',
  name: 'The Standard Book of Spells (Grade 1), by Miranda Goshawk',
  itemType: 'book',
  description: 'Everything you need to know about spells'
}];

let potions = [{
  icon: 'fas fa-flask',
  name: 'Draught of Living Death',
  itemType: 'potion',
  description: 'When a person drinks the Draught of Living Death, they go into a deep sleep so strong that they appear to be dead'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Pepperup Potion',
  itemType: 'potion',
  description: 'A Pepperup Potion is designed to improve health, relieve coughs and colds'
},
{
  icon: 'fas fa-flask',
  name: 'Draught of Peace',
  itemType: 'potion',
  description: 'The Draught of Peace provides personal comfort, calms anxiety and soothes agitation'
},
{
  icon: 'fas fa-flask',
  name: 'Confusing Concoction',
  itemType: 'potion',
  description: 'A Confusing Concoction causes the drinker to become confused, distracted[3] and sick.'
},
{
  icon: 'fas fa-glass-martini',
  name: 'Amortentia',
  itemType: 'potion',
  description: 'Amortentia is a love potion that does not create actual love, but gives the drinker a powerful obsession and infatuation with the giver of the potion'
},
{
  icon: 'fas fa-flask',
  name: 'Skele-Gro',
  itemType: 'potion',
  description: 'Skele-Gro is a medicinal potion that can regrow missing or removed bones, though it tastes terrible and the process is very slow and extremely painful'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Sleekeazy\'s Hair Potion',
  itemType: 'potion',
  description: 'Sleekeazy\'s Hair Potion is a beauty treatment used by witches to smooth and straighten hair'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Veritaserum',
  itemType: 'potion',
  description: 'Three drops of this potion are all that is needed to force anyone to respond to any question with the truth'
},
{
  icon: 'fas fa-flask',
  name: 'Polyjuice Potion',
  itemType: 'potion',
  description: 'The Polyjuice Potion allows the drinker to assume the appearance of someone else for an hour or more depending on the quantity'
},
{
  icon: 'fas fa-flask',
  name: 'Felix Felicis',
  itemType: 'potion',
  description: 'Felix Felicis, more commonly known as Liquid Luck, grants whoever drinks it unusually good luck'
}];

let cloaks = [{
  icon: 'fas fa-tshirt',
  name: 'Winter Cloak',
  itemType: 'cloak',
  description: 'Required to wear in cold weather'
},
{
  icon: 'fas fa-tshirt',
  name: 'Cloack of invisibility',
  itemType: 'cloak',
  description: 'This cloak renders the wearer truly invisible, as opposed to other cloaks, whose enchantment tends to wear off after years of frequent use.'
},
{
  icon: 'fas fa-tshirt',
  name: 'Shield Cloaks',
  itemType: 'cloak',
  description: 'These cloaks are enchanted with a Shield Charm and, when worn, shield the wearer from many light to moderate curses, jinxes, and other unfriendly spells. '
},
{
  icon: 'fas fa-tshirt',
  name: 'Mantle',
  itemType: 'cloak',
  description: 'A type of loose garment; a long, loose cape-like cloak usually worn over indoor clothing to serve the same purpose as an overcoat'
},
{
  icon: 'fas fa-tshirt',
  name: 'Fur Cloak',
  itemType: 'cloak',
  description: 'Long outer garment worn over the shoulders covering the back, with a fur lining.'
},
{
  icon: 'fas fa-mitten',
  name: 'Dragon Hide Gloves',
  itemType: 'cloak',
  description: 'I\'m sure you need it more than the dragon did'
},
{
  icon: 'fas fa-hat-wizard',
  name: 'Classic Pointed Hat',
  itemType: 'cloak',
  description: 'Now you can look fashionable whilst cackling'
}];


ShopModel.create(pets)
.then((response) => {
  console.log('populated pets database');
})
.catch((response) => {
  console.log('something went wrong: pets', response);
});

ShopModel.create(books)
.then((response) => {
  console.log('populated books database');
})
.catch((response) => {
  console.log('something went wrong: books', response);
});

ShopModel.create(potions)
.then((response) => {
  console.log('populated potions database');
})
.catch((response) => {
  console.log('something went wrong: potions ', response);
});

ShopModel.create(cloaks)
.then((response) => {
  console.log('populated cloaks database');
})
.catch((response) => {
  console.log('something went wrong: cloaks ', response);
});

// don't need to close database as seed is run automatically by app.js
// Promise.all([dataBase]) 
// .then(() => {
//   mongoose.connection.close();
// })
// .catch(() => {
//   console.log('Something went wrong');
// });
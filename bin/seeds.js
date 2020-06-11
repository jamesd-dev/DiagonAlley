let ShopModel = require('../models/Shop.model');
//const mongoose = require('mongoose');
//require('../configs/db.config');

let pets = [{
  icon: 'fas fa-otter',
  name: 'Otter',
  itemType: 'pet',
  description: 'The most ferocious kind of underwater cat, likes fish, cuddles and the blood of the innocent',
  money: 11
},
{
  icon: 'fas fa-otter',
  name: 'Mink',
  itemType: 'pet',
  description: 'The larval stage of a fur coat. Doesn\'t seem too thrilled about it',
  money: 13
},
{
  icon: 'fas fa-hippo',
  name: 'Hippo',
  itemType: 'pet',
  description: 'It\'s just a fat, wet dog, they\'ll be sure to let you keep it.',
  money: 16
},
{
  icon: 'fas fa-cat',
  name: 'Cat',
  itemType: 'pet',
  description: 'Essentially an abusive relationship with fur',
  money: 9
},
{
  icon: 'fas fa-spider',
  name: 'Spider',
  itemType: 'pet',
  description: 'Ew, gross. Dem legs tho...',
  money: 7
},
{
  icon: 'fas fa-kiwi-bird',
  name: 'Kiwi Bird',
  itemType: 'pet',
  description: 'Not a kiwi, not really a bird either. It\'s an existential crisis with a beak',
  money: 11
},
{
  icon: 'fas fa-cat',
  name: 'Panther',
  itemType: 'pet',
  description: 'Goth buff cat',
  money: 15
},
{
  icon: 'fas fa-frog',
  name: 'Frog',
  itemType: 'pet',
  description: 'Solidify your reputation as a loser, be the king/queen of the bullied kids with your very own frog',
  money: 7
  
},
{
  icon: 'fas fa-otter',
  name: 'Niffler',
  itemType: 'pet',
  description: 'Cute thieves, which makes it okay',
  money: 12
},
{
  icon: 'fas fa-dragon',
  name: 'Dragon',
  itemType: 'pet',
  description: 'Definitely not allowed. Do it.',
  money: 20
},
{
  icon: 'fas fa-crow',
  name: 'Crow',
  itemType: 'pet',
  description: 'Excellent for cleaning up all of that pesky carrion left over from slaying your enemies',
  money: 8
},
{
  icon: 'fas fa-frog',
  name: 'Toad',
  itemType: 'pet',
  description: 'Literally the same as a frog, just less smug about it',
  money: 8
},
{
  icon: 'fas fa-fish',
  name: 'Fish',
  itemType: 'pet',
  description: 'It\'s looking for it\'s dad',
  money: 7
},
{
  icon: 'fas fa-fish',
  name: 'Kraken',
  itemType: 'pet',
  description: 'Comes with free rum and nightmares',
  money: 18
},
{
  icon: 'fas fa-paw',
  name: 'Dog',
  itemType: 'pet',
  description: 'Like a cat, except it actually likes you',
  money: 10
}];

let books = [{
  icon: 'fas fa-book',
  name: 'A History of Magic, by Adalbert Waffling',
  itemType: 'book',
  description: 'Where it all began',
  money: 7
},
{
  icon: 'fas fa-book',
  name: 'A Beginner\'s Guide to Transfiguration, by Emeric Switch',
  itemType: 'book',
  description: 'Everything you need to know about Transfiguration',
  money: 6
},
{
  icon: 'fas fa-book-dead',
  name: 'One Thousand Magical Herbs and Fungi, by Phyllida Spore',
  itemType: 'book',
  description: 'A guide to the magical Flora surrounding us',
  money: 8
},
{
  icon: 'fas fa-book',
  name: 'Javascript for Wizards, by Edmund Glitch',
  itemType: 'book',
  description: 'You can do magic? ...what are you doing?',
  money: 8
},
{
  icon: 'fas fa-book',
  name: '101 Nose Growing Spells and Charms, by The Dark Lord',
  itemType: 'book',
  description: 'Of course they work!',
  money: 5
},
{
  icon: 'fas fa-book-dead',
  name: 'Magical Drafts and Potions, by Arsenius Jigger',
  itemType: 'book',
  description: 'Your guide to potions',
  money: 7
},
{
  icon: 'fas fa-book-dead',
  name: 'Fantastic Beasts and Where to Find Them, by Newt Scamander',
  itemType: 'book',
  description: 'Where to find great beasts',
  money: 5
},
{
  icon: 'fas fa-book',
  name: 'The Lord of the Bling, by Kanye West',
  itemType: 'book',
  description: 'A rappers guide to marrying hobbits',
  money: 6
},
{
  icon: 'fas fa-book-dead',
  name: 'Pumpkin Soup for the Soul, by Dick Redding',
  itemType: 'book',
  description: 'For those days when you need touching stories to make you re-hate humanity',
  money: 5
},
{
  icon: 'fas fa-book-dead',
  name: 'The Dark Forces: A Guide to Self-Protection, by Quentin Trimble',
  itemType: 'book',
  description: 'How to protect yourself from The Dark Forces',
  money: 9
},
{
  icon: 'fas fa-book-dead',
  name: 'The Necronmonican, by Goths',
  itemType: 'book',
  description: 'You can\'t be one of the non-conformists if you don\'t read this book',
  money: 7
},
{
  icon: 'fas fa-book',
  name: 'The Standard Book of Spells (Grade 1), by Miranda Goshawk',
  itemType: 'book',
  description: 'Everything you need to know about spells',
  money: 6
},
{
  icon: 'fas fa-book-dead',
  name: 'Asteroid Farming, by The Little Prince',
  itemType: 'book',
  description: 'How to easily root out those pesky baobabs',
  money: 5
}];

let potions = [{
  icon: 'fas fa-flask',
  name: 'Draught of Living Death',
  itemType: 'potion',
  description: 'When a person drinks the Draught of Living Death, they go into a deep sleep so strong that they appear to be dead',
  money: 12
},
{
  icon: 'fas fa-flask',
  name: 'Blue sky',
  itemType: 'potion',
  description: 'Makes rainy day into a sunny day',
  money: 8
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Invisalion',
  itemType: 'potion',
  description: 'Makes you invisible for an hour',
  money: 10
},
{
  icon: 'fas fa-glass-martini',
  name: 'Smelly',
  itemType: 'potion',
  description: 'Makes you smell like flowers',
  money: 7
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Hulk',
  itemType: 'potion',
  description: 'You will become super strong. It takes lots of energy',
  money: 10
},
{
  icon: 'fas fa-flask',
  name: 'Zombie',
  itemType: 'potion',
  description: 'No pain, no worries for one hour',
  money: 11
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Pepperup Potion',
  itemType: 'potion',
  description: 'A Pepperup Potion is designed to improve health, relieve coughs and colds',
  money: 8
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Absinthe',
  itemType: 'potion',
  description: 'A \'Potion\' to see \'visions\'. *wink*',
  money: 13
},
{
  icon: 'fas fa-flask',
  name: 'Draught of Peace',
  itemType: 'potion',
  description: 'The Draught of Peace provides personal comfort, calms anxiety and soothes agitation',
  money: 8
},
{
  icon: 'fas fa-flask',
  name: 'Message in a Bottle',
  itemType: 'potion',
  description: 'A mysterious bottle found on sandy shores! What mysteries might be contained within?',
  money: 7
},
{
  icon: 'fas fa-flask',
  name: 'Confusing Concoction',
  itemType: 'potion',
  description: 'A Confusing Concoction causes the drinker to become confused, distracted[3] and sick.',
  money: 6
},
{
  icon: 'fas fa-glass-martini',
  name: 'Amortentia',
  itemType: 'potion',
  description: 'Amortentia is a love potion that does not create actual love, but gives the drinker a powerful obsession and infatuation with the giver of the potion',
  money: 7
},
{
  icon: 'fas fa-flask',
  name: 'Skele-Gro',
  itemType: 'potion',
  description: 'Skele-Gro is a medicinal potion that can regrow missing or removed bones, though it tastes terrible and the process is very slow and extremely painful',
  money: 12
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Sleekeazy\'s Hair Potion',
  itemType: 'potion',
  description: 'Sleekeazy\'s Hair Potion is a beauty treatment used by witches to smooth and straighten hair',
  money: 7
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Heroin',
  itemType: 'potion',
  description: 'A moste effectacious potione, the drinker wille moste surely trip balls',
  money: 7
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Veritaserum',
  itemType: 'potion',
  description: 'Three drops of this potion are all that is needed to force anyone to respond to any question with the truth',
  money: 11
},
{
  icon: 'fas fa-flask',
  name: 'Polyjuice Potion',
  itemType: 'potion',
  description: 'The Polyjuice Potion allows the drinker to assume the appearance of someone else for an hour or more depending on the quantity',
  money: 9
},
{
  icon: 'fas fa-flask',
  name: 'Felix Felicis',
  itemType: 'potion',
  description: 'Felix Felicis, more commonly known as Liquid Luck, grants whoever drinks it unusually good luck',
  money: 9
}];

let cloaks = [{
  icon: 'fas fa-tshirt',
  name: 'Winter Cloak',
  itemType: 'cloak',
  description: 'Required to wear in cold weather',
  money: 14
},
{
  icon: 'fas fa-tshirt',
  name: 'Cloak of invisibility',
  itemType: 'cloak',
  description: 'This cloak renders the wearer truly invisible, as opposed to other cloaks, whose enchantment tends to wear off after years of frequent use.',
  money: 25
},
{
  icon: 'fas fa-tshirt',
  name: 'Shield Cloaks',
  itemType: 'cloak',
  description: 'These cloaks are enchanted with a Shield Charm and, when worn, shield the wearer from many light to moderate curses, jinxes, and other unfriendly spells. ',
  money: 20
},
{
  icon: 'fas fa-hat-wizard',
  name: 'Thor\'s helmet',
  itemType: 'cloak',
  description: 'Helmet of the mighty Thor! Gain his mighty powers of being stalked by fangirls!',
  money: 16
},
{
  icon: 'fas fa-tshirt',
  name: 'Mantle',
  itemType: 'cloak',
  description: 'A type of loose garment; a long, loose cape-like cloak usually worn over indoor clothing to serve the same purpose as an overcoat',
  money: 13
},
{
  icon: 'fas fa-tshirt',
  name: 'Maid Outfit',
  itemType: 'cloak',
  description: 'For.. cleaning',
  money: 14
},
{
  icon: 'fas fa-tshirt',
  name: 'Gryffindor Robe',
  itemType: 'cloak',
  description: 'The official robe for the Gryffindor House',
  money: 15
},
{
  icon: 'fas fa-tshirt',
  name: 'Slytherin Robe',
  itemType: 'cloak',
  description: 'The official robe for the Slytherin House',
  money: 15
},
{
  icon: 'fas fa-tshirt',
  name: 'Ravenclaw Robe',
  itemType: 'cloak',
  description: 'The official robe for the Ravenclaw House',
  money: 15
},
{
  icon: 'fas fa-tshirt',
  name: 'Hufflepuff Robe',
  itemType: 'cloak',
  description: 'The official robe for the Hufflepuff House',
  money: 15
},
{
  icon: 'fas fa-tshirt',
  name: 'Quidditch Robe',
  itemType: 'cloak',
  description: 'Ready for a Quidditch match?',
  money: 16
},
{
  icon: 'fas fa-tshirt',
  name: 'Fur Cloak',
  itemType: 'cloak',
  description: 'Long outer garment worn over the shoulders covering the back, with a fur lining.',
  money: 17
},
{
  icon: 'fas fa-mitten',
  name: 'Dragon Hide Gloves',
  itemType: 'cloak',
  description: 'I\'m sure you need it more than the dragon did',
  money: 13
},
{
  icon: 'fas fa-mitten',
  name: 'Fingerless Hobo Gloves',
  itemType: 'cloak',
  description: 'Now with a handy compartment for needles',
  money: 12
},
{
  icon: 'fas fa-hat-wizard',
  name: 'Classic Pointed Hat',
  itemType: 'cloak',
  description: 'Now you can look fashionable whilst cackling',
  money: 10
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
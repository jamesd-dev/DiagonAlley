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
  icon: 'fas fa-otter',
  name: 'Mink',
  itemType: 'pet',
  description: 'The larval stage of a fur coat. Doesn\'t seem too thrilled about it'
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
  icon: 'fas fa-cat',
  name: 'Panther',
  itemType: 'pet',
  description: 'Goth buff cat'
},
{
  icon: 'fas fa-frog',
  name: 'Frog',
  itemType: 'pet',
  description: 'Solidify your reputation as a loser, be the king/queen of the bullied kids with your very own frog'
},
{
  icon: 'fas fa-otter',
  name: 'Niffler',
  itemType: 'pet',
  description: 'Cute thieves, which makes it okay'
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
  icon: 'fas fa-frog',
  name: 'Toad',
  itemType: 'pet',
  description: 'Literally the same as a frog, just less smug about it'
},
{
  icon: 'fas fa-fish',
  name: 'Fish',
  itemType: 'pet',
  description: 'It\'s looking for it\'s dad'
},
{
  icon: 'fas fa-fish',
  name: 'Kraken',
  itemType: 'pet',
  description: 'Comes with free rum and nightmares'
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
  icon: 'fas fa-book',
  name: 'Javascript for Wizards, by Edmund Glitch',
  itemType: 'book',
  description: 'You can do magic? ...what are you doing?'
},
{
  icon: 'fas fa-book',
  name: '101 Nose Growing Spells and Charms, by The Dark Lord',
  itemType: 'book',
  description: 'Of course they work!'
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
  icon: 'fas fa-book',
  name: 'The Lord of the Bling, by Kanye West',
  itemType: 'book',
  description: 'A rappers guide to marrying hobbits'
},
{
  icon: 'fas fa-book-dead',
  name: 'Pumpkin Soup for the Soul, by Dick Redding',
  itemType: 'book',
  description: 'For those days when you need touching stories to make you re-hate humanity'
},
{
  icon: 'fas fa-book-dead',
  name: 'The Dark Forces: A Guide to Self-Protection, by Quentin Trimble',
  itemType: 'book',
  description: 'How to protect yourself from The Dark Forces'
},
{
  icon: 'fas fa-book-dead',
  name: 'The Necronmonican, by Goths',
  itemType: 'book',
  description: 'You can\'t be one of the non-conformists if you don\'t read this book'
},
{
  icon: 'fas fa-book',
  name: 'The Standard Book of Spells (Grade 1), by Miranda Goshawk',
  itemType: 'book',
  description: 'Everything you need to know about spells'
},
{
  icon: 'fas fa-book-dead',
  name: 'Asteroid Farming, by The Little Prince',
  itemType: 'book',
  description: 'How to easily root out those pesky baobabs'
}];

let potions = [{
  icon: 'fas fa-flask',
  name: 'Draught of Living Death',
  itemType: 'potion',
  description: 'When a person drinks the Draught of Living Death, they go into a deep sleep so strong that they appear to be dead'
},
{
  icon: 'fas fa-flask',
  name: 'Blue sky',
  itemType: 'potion',
  description: 'Makes rainy day into a sunny day'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Invisalion',
  itemType: 'potion',
  description: 'Makes you invisible for an hour'
},
{
  icon: 'fas fa-glass-martini',
  name: 'Smelly',
  itemType: 'potion',
  description: 'Makes you smell like flowers'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Hulk',
  itemType: 'potion',
  description: 'You will become super strong. It takes lots of energy'
},
{
  icon: 'fas fa-flask',
  name: 'Zombie',
  itemType: 'potion',
  description: 'No pain, no worries for one hour'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Pepperup Potion',
  itemType: 'potion',
  description: 'A Pepperup Potion is designed to improve health, relieve coughs and colds'
},
{
  icon: 'fas fa-glass-whiskey',
  name: 'Absinthe',
  itemType: 'potion',
  description: 'A \'Potion\' to see \'visions\'. *wink*'
},
{
  icon: 'fas fa-flask',
  name: 'Draught of Peace',
  itemType: 'potion',
  description: 'The Draught of Peace provides personal comfort, calms anxiety and soothes agitation'
},
{
  icon: 'fas fa-flask',
  name: 'Message in a Bottle',
  itemType: 'potion',
  description: 'A mysterious bottle found on sandy shores! What mysteries might be contained within?'
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
  name: 'Heroin',
  itemType: 'potion',
  description: 'A moste effectacious potione, the drinker wille moste surely trip balls'
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
  name: 'Cloak of invisibility',
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
  icon: 'fas fa-hat-wizard',
  name: 'Thor\'s helmet',
  itemType: 'cloak',
  description: 'Helmet of the mighty Thor! Gain his mighty powers of being stalked by fangirls!'
},
{
  icon: 'fas fa-tshirt',
  name: 'Mantle',
  itemType: 'cloak',
  description: 'A type of loose garment; a long, loose cape-like cloak usually worn over indoor clothing to serve the same purpose as an overcoat'
},
{
  icon: 'fas fa-tshirt',
  name: 'Maid Outfit',
  itemType: 'cloak',
  description: 'For.. cleaning'
},
{
  icon: 'fas fa-tshirt',
  name: 'Gryffindor Robe',
  itemType: 'cloak',
  description: 'The official robe for the Gryffindor House'
},
{
  icon: 'fas fa-tshirt',
  name: 'Slytherin Robe',
  itemType: 'cloak',
  description: 'The official robe for the Slytherin House'
},
{
  icon: 'fas fa-tshirt',
  name: 'Ravenclaw Robe',
  itemType: 'cloak',
  description: 'The official robe for the Ravenclaw House'
},
{
  icon: 'fas fa-tshirt',
  name: 'Hufflepuff Robe',
  itemType: 'cloak',
  description: 'The official robe for the Hufflepuff House'
},
{
  icon: 'fas fa-tshirt',
  name: 'Quidditch Robe',
  itemType: 'cloak',
  description: 'Ready for a Quidditch match?'
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
  icon: 'fas fa-mitten',
  name: 'Fingerless Hobo Gloves',
  itemType: 'cloak',
  description: 'Now with a handy compartment for needles'
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
# DiagonAlley
Shopping app for the ambitious young wizard or witch

## User Stories
- 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- sign up - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- login - As a user I want to be able to log in on the webpage so that I can get back to my account
- letter - As a user i want to be able to see my acceptance letter to Hogwarts once i sign up. 
- profile - As a user i want to be able to see my profile, where i can see which house im a part of and the items i bought. 
- shop - As a user I want to be able to purchase the items from the shop list

## Backlog
- logout - As a user i want to be able to log out of my account
- extra pages - apart from the shop page 
- potions instagram - an instagram like feature for potions you can create

## User profile:

see my profile
emblem what house theyre in
how much money they have 
what items you own


...
## ROUTES:
- GET /

Render the login/signup page 

- GET /login

renders login page
redirects to /profile if user is already logged in

- POST /login

if entered correctly password and user name, redirected to profile

- GET /signup

renders to signup page

- POST /signup

if entered correctly email, password and user name, redirected to acceptance letter

- GET /accepted

renders acceptance letter and have a button to go to /profile

- GET /profile

renders user profile

- GET/profile/pets

renders pets store

- Extra:

GET/profile/books

renders books store

GET/profile/potions

renders potions store

## Models
### user model 

new Schema ({
_id: 

email: String, required: true, unique: true,

password: String, minlength: 6, maxlength: 30,

userName: String, required: true, unique: true, maxlength: 20 

hogwartsHouse: required: true type: String,
        enum : ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff', 'Unsorted']

### shop list

shopList new Schema ({

_id: icon: String, required: true, 

name: [string], required: true, unique: true, 

itemType: enum [ "pet", "books", "potions"], required:true , 

author: type: String })
  
## Links
### Trello
https://trello.com/b/BXQiE1Qs/hogwarts

### Git

https://github.com/polymurph13/DiagonAlley

Deploy Link

### Slides

Link

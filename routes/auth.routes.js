const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs', {layout: false});
});

router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;
    
    if (!username || !email || !password) {
        res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Please enter username, email and password',
            username,
            email,
            layout: false
          });
        return;  
    }

    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
      res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Email format not correct',
            username,
            email,
            layout: false
          });
        return;  
    }

    const myPassRegex = new RegExp(/^[\s\S]{8,}$/);
    if (!myPassRegex.test(password)) {
      res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet',
            username,
            email,
            layout: false
          });
        return;  
    }

    bcrypt.genSalt(12)
      .then((salt) => {
        console.log('Salt: ', salt);
        bcrypt.hash(password, salt)
          .then((passwordHash) => {
            UserModel.create({username, email, passwordHash, hogwartsHouse: 'Unsorted'})
              .then(() => {
                UserModel.findOne({username})
                .then((userData) => {
                  req.session.loggedInUser = userData;
                  res.redirect('/profile');
                });
              })
              .catch((err) => {
                if (err.code === 11000) {
                  res.status(500)
                  .render('auth/signup.hbs', {
                    errorMessage: 'username or email entered already exists!',
                    username,
                    email,
                    layout: false
                  });
                  return;  
                } 
                else {
                  res.status(500)
                  .render('auth/signup.hbs', {
                    errorMessage: 'Something went wrong! Go to sleep!',
                    username,
                    email,
                    layout: false
                  });
                  return; 
                }
              })
          });  
  });

});

router.get('/login', (req, res) => {
  res.render('auth/login.hbs', {layout: false});
});


router.post('/login', (req, res) => {
  const {username, password } = req.body;
  if ( !username || !password) {
    res.status(500)
      .render('auth/signup.hbs', {
        errorMessage: 'Please enter username and password',
        layout: false
      });
    return;  
  }

  // Find if the user exists in the database 
  UserModel.findOne({username})
    .then((userData) => {
         //check if passwords match
        bcrypt.compare(password, userData.passwordHash)
          .then((doesItMatch) => {
              //if it matches
              if (doesItMatch) {
                // req.session is the special object that is available to you
                req.session.loggedInUser = userData;
                res.redirect('/profile');
              }
              //if passwords do not match
              else {
                res.status(500)
                  .render('auth/login.hbs', {
                    errorMessage: 'Passwords don\'t match',
                    layout: false
                  });
                return; 
              }
          })
          .catch(() => {
            res.status(500)
            .render('auth/login.hbs', {
              errorMessage: 'Something wen\'t wrong!',
              layout: false
            });
            return; 
          });
    })
    //throw an error if the user does not exists 
    .catch(() => {
      res.status(500)
        .render('auth/login.hbs', {
          errorMessage: 'Something went wrong',
          layout: false
        });
      return;  
    });

});

router.get('/accept', (req, res) => {
  res.render('auth/accept.hbs');
});

router.get('/profile', (req, res) => {
    res.render('users/profile.hbs', {userData: req.session.loggedInUser});
});

module.exports = router;
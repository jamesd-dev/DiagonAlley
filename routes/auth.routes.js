const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs');
});

router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;
    console.log(username, email, password);

    
    if (!username || !email || !password) {
        res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Please enter username, email and password'
          });
        return;  
    }

    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
      res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Email format not correct'
          });
        return;  
    }

    const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (!myPassRegex.test(password)) {
      res.status(500)
          .render('auth/signup.hbs', {
            errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
          });
        return;  
    }

    bcrypt.genSalt(12)
      .then((salt) => {
        console.log('Salt: ', salt);
        bcrypt.hash(password, salt)
          .then((passwordHash) => {
            UserModel.create({email, username, passwordHash})
              .then(() => {
                res.redirect('/profile');
              })
              .catch((err) => {
                if (err.code === 11000) {
                  res.status(500)
                  .render('auth/signup.hbs', {
                    errorMessage: 'username or email entered already exists!'
                  });
                  return;  
                } 
                else {
                  res.status(500)
                  .render('auth/signup.hbs', {
                    errorMessage: 'Something went wrong! Go to sleep!'
                  });
                  return; 
                }
              })
          });  
  });

});

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs');
});


router.post('/signin', (req, res) => {
  const {email, password } = req.body;
  if ( !email || !password) {
    res.status(500)
      .render('auth/signup.hbs', {
        errorMessage: 'Please enter username, email and password'
      });
    return;  
  }
  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
    res.status(500)
        .render('auth/signup.hbs', {
          errorMessage: 'Email format not correct'
        });
      return;  
  }

  // Find if the user exists in the database 
  UserModel.findOne({email})
    .then((userData) => {
         //check if passwords match
        bcrypt.compare(password, userData.passwordHash)
          .then((doesItMatch) => {
              //if it matches
              if (doesItMatch) {
                // req.session is the special object that is available to you
                
                req.session.loggedInUser = userData;
                //req.session.greet = 'Hola';
                res.redirect('/profile');
              }
              //if passwords do not match
              else {
                res.status(500)
                  .render('auth/signin.hbs', {
                    errorMessage: 'Passwords don\'t match'
                  });
                return; 
              }
          })
          .catch(() => {
            res.status(500)
            .render('auth/signin.hbs', {
              errorMessage: 'Something wen\'t wrong!'
            });
            return; 
          });
    })
    //throw an error if the user does not exists 
    .catch(() => {
      res.status(500)
        .render('auth/signin.hbs', {
          errorMessage: 'Something went wrong'
        });
      return;  
    });

});

router.get('/profile', (req, res) => {
    res.render('users/profile.hbs', {userData: req.session.loggedInUser});
})

module.exports = router;
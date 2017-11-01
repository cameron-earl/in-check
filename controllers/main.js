const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {

  index: function(req, res) {
    let message = {
      message: req.session.message
    };
    req.session.message = null;
    req.session.save(err => {
      res.render('pages/index', message);
    });
  },

  registerPage: function(req, res) {
    let message = {
      message: req.session.message
    };
    req.session.message = null;
    res.render('pages/register', message);
  },

  register: function(req, res) {
    encryption.hash(req.body).then((encryptedUser) => {
        knex('families')
          .insert({
            name: req.body.name
          }, '*')
          .then((result) => {
            knex('users')
              .insert({
                username: req.body.username,
                password: encryptedUser.password,
                family_id: result[0].id,
                is_parent: true,
                first_name: "Parent's first name" //TODO get from form
              })
              .then(() => {
                res.redirect('/');
              })
          })
      })
      .catch(err => {
        req.session.message = "Error in registration, Try again!!!.";
        req.session.save(err => {
          res.redirect('/');
        })
      })

  },

  login: function(req, res) {
    console.log(JSON.stringify(req.body,null,2));
    knex('users')
      .where('username', req.body.username)
      .limit(1)
      .then((resultArr) => {
        let user = resultArr[0];
        if (user) {
          let isParent = user.is_parent;
          let authStr = isParent ? "parent" : "child";
          encryption.check(user, req.body)
            .then((isValid) => {
              if (isValid) {
                req.session.family = user.family_id;
                req.session.user = user.id;
                req.session.auth = authStr;
                req.session.save(err => {
                  res.redirect(`/${isParent ? "family" : "child"}`);
                });
              } else {
                req.session.message = "You entered an invalid username or password.";
                req.session.save(err => {
                  res.redirect('/');
                });
              }
            })
        } else {
          req.session.message = "You entered an invalid username or password."
          req.session.save(err => {
            res.redirect('/');
          });
        }
      }).catch((err) => {
        console.log(err);
        req.session.message = "Our website had an error. Please try again."
        req.session.save(err => {
          res.redirect('/');
        });
      });
  }

}

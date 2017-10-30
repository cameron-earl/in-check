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
              console.log(result);
              knex('parents')
                .insert({
                  username: req.body.username,
                  password: encryptedUser.password,
                  family_id: result[0].id
                })
                .then(()=>{
                  res.redirect('/');
                })
            })
       })
       .catch(err=>{
         req.session.message = "Error in registration, Try again!!!.";
    req.session.save(err => {
      res.redirect('/');
    })
       })

    }
}

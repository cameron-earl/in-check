const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
    login: function(req, res){
      knex('parents')
       .where('username', req.body.username)
       .limit(1)
       .then((resultArr) => {
         let user = resultArr[0];
         if (user) {
           encryption.check(user, req.body)
             .then((isValid) => {
               if (isValid) {
                 req.session.family = user.family_id;
                 req.session.save(err=>{
                   res.redirect('/family');
                 });
               } else {
                 req.session.message = "You entered an invalid username or password.";
                 req.session.save(err=>{
                   res.redirect('/');
                 });
               }
             })
         } else {
           req.session.message = "You entered an invalid username or password."
           req.session.save(err=>{
             res.redirect('/');
           });
         }
       }).catch((err) => {
         console.log(err);
         req.session.message = "Our website had an error. Please try again."
         req.session.save(err=>{
           res.redirect('/');
         });
       });
    },

    index: function(req, res) {
      let returnObj = {
        message: req.session.message
      };
      req.session.message = null;
      let family = req.session.family;
      knex('children')
        .where('family_id', family)
        .then((resultArr)=>{
          let children = resultArr;
          req.session.save(err => {
            res.render('family', message);
          });

        })
        .catch((err) => {
          console.log(err);
          req.session.message = "Our website had an error. Please try again."
          req.session.family = null;
          req.session.save(err=>{
            res.redirect('/');
          });
        });

    }
}

const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {

  createChild: function(req, res){
    knex('children')
      .insert({
        first_name: req.body.first_name,
        username: req.body.username,
        password: req.body.password,
        family_id: req.session.family
      })
      .then(()=>{
        res.redirect('/family')
      })
      .catch((err) => {
        console.log(err);
        req.session.message = "No babies made"
        req.session.save(err=>{
          res.redirect('/family');
        });
      });

  }
}

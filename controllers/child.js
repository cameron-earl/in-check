const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {

  login: function(req, res){
    knex('children')
     .where('username', req.body.username)
     .limit(1)
     .then((resultArr) => {
       let user = resultArr[0];
       if (user) {
         encryption.check(user, req.body)
           .then((isValid) => {
             if (isValid) {
               req.session.family = user.family_id;
               req.session.child = user.id;
               req.session.save(err=>{
                 res.redirect('/child');
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

  index: function(req, res){
     let childID = req.session.child;
     let returnObj = {
       message: req.session.message
     };
     req.session.message = null;

     knex('children')
       .where('id', childID)
       .limit(1)
       .then((resultArr)=>{
         let child = resultArr[0];
         knex('chores')
         .where('child_id', child.id)
         .then((chores)=>{
           //get completed status of all chores
           //get approval status of all chores
           for (let chore of chores) {
             chore.completed = false;
             chore.approved = false;
           }
           let choreIds = chores.map(c=>c.id);
           knex('completed_chores')
             .whereIn('chore_id', choreIds)
             .then((completedChores)=>{
               for (let completedChore of completedChores) {
                 let thisChore = chores.find(c=>c.id===completedChore.chore_id);
                 thisChore.completed = true;
                 thisChore.approved = completedChore.approved;
               }

               //add chores for each child to child object
               returnObj.chores = chores;

               returnObj.child = child;
               req.session.save(err => {
                 res.render('pages/child', returnObj);
               });
             })
         })
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

const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {

  index: function(req, res){
     let childID = req.session.user;
     let returnObj = {
       message: req.session.message
     };
     req.session.message = null;

     knex('users')
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
     },

     uncomplete: function(req, res){
       knex('completed_chores')
       .del()
       .where(
         "chore_id", req.params.chore
       )
       .limit(1)
       .then(()=>{
         res.redirect('/child');
       })
       .catch((err) => {
         console.log(err);
         req.session.message = "Error marking chore as incomplete."
         req.session.save(err=>{
           res.redirect('/child');
         });
       });

     },

     complete: function(req, res){
       knex('completed_chores')
       .insert({
        chore_id: req.params.chore
       })
       .then(()=>{
         res.redirect('/child');
       })
       .catch((err) => {
         console.log(err);
         req.session.message = "Error marking chore as complete."
         req.session.save(err=>{
           res.redirect('/child');
         });
       });
     }

}

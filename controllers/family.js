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
        .then((children)=>{
          //get chores for children
          let childIds = children.map(c=>c.id);
          knex('chores')
          .whereIn('child_id', childIds)
          .then((mixedChores)=>{
            //get completed status of all chores
            //get approval status of all chores
            for (let chore of mixedChores) {
              chore.completed = false;
              chore.approved = false;
            }
            let choreIds = mixedChores.map(c=>c.id);
            knex('completed_chores')
              .whereIn('chore_id', choreIds)
              .then((mixedCompletedChores)=>{
                for (let completedChore of mixedCompletedChores) {
                  let thisChore = mixedChores.find(c=>c.id===completedChore.chore_id);
                  thisChore.completed = true;
                  thisChore.approved = completedChore.approved;
                }

                //add chores for each child to child object
                for (let child of children) {
                  child.chores = mixedChores.filter(chore=>chore.child_id===child.id);
                }
                let returnObj.children = children;
                req.session.save(err => {
                  res.render('family', returnObj);
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

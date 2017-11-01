const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {

    index: function(req, res) {
      let returnObj = {
        message: req.session.message
      };
      req.session.message = null;

      let family = req.session.family;
      knex('users')
        .where('family_id', family)
        .andWhere('is_parent', false)
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
                returnObj.children = children;
                req.session.save(err => {
                  res.render('pages/family', returnObj);
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
    createChild: function(req, res){
      encryption.hash(req.body).then(encryptedUser=>{
        knex('users')
          .insert({
            first_name: encryptedUser.first_name,
            username: encryptedUser.username,
            password: encryptedUser.password,
            family_id: req.session.family
          })
          .then(()=>{
            res.redirect('/family')
          })
      })
      .catch((err) => {
        console.log(err);
        req.session.message = "There was a problem. You'll have to keep trying to make a baby."
        req.session.save(err=>{
          res.redirect('/family');
        });
      });
    },

    viewChild: function(req, res){
      let childID = req.params.id;
      let returnObj = {
        message: req.session.message
      };
      req.session.message = null;
      let family = req.session.family;
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
                child.chores = chores;
                for (let chore of child.chores) {
                  console.log(JSON.stringify());
                }
                returnObj.child = child;
                req.session.save(err => {
                  res.render('pages/child_parent_view', returnObj);
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

      editChildPage: function(req, res) {},

      editChild: function(req, res) {},

      deleteChild: function(req, res) {},

      createChore: function(req, res) {
        let childId = req.body.child_id;
        console.log(JSON.stringify(req.body, null, 2));
        let insertObj = {
          title: req.body.title,
          description: req.body.description,
          value: req.body.value,
          child_id: childId
        };

        if (req.body.start_date !== "") insertObj.start_date = req.body.start_date;
        if (req.body.end_date !== "") insertObj.end_date = req.body.end_date;

        knex('chores')
          .insert(insertObj, '*')
          .then((result)=>{
            req.session.save(err=>{
              res.redirect('/family/children/' + childId );
            });
          })
          .catch((err) => {
            console.log(err);
            req.session.message = "Error adding chore. Please try again."
            req.session.save(err=>{
              let path = '/family' + (childId ? `/children/${childId}` : '');
              res.redirect(path);
            });
          });
      },

      editChore: function(req, res) {},

      deleteChore: function(req, res) {}
}

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
      .orderBy('created_at')
      .then((children)=>{
        //get chores for children
        let childIds = children.map(c=>c.id);
        knex('chores')
        .whereIn('child_id', childIds)
        .orderBy('created_at')
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
            .orderBy('created_at')
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
              knex('families')
                .where('id', family)
                .limit(1)
                .then(resultArr=>{
                  returnObj.family = resultArr[0];
                  req.session.save(err => {
                    res.render('pages/family', returnObj);
                  });
                })
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
    let childId = req.params.child;
    let returnObj = {
      message: req.session.message
    };
    req.session.message = null;
    let family = req.session.family;
    knex('users')
      .where('is_parent', false)
      .andWhere('family_id', family)
      .orderBy('created_at')
      .then((children)=>{
        returnObj.children = children;
        let child = children.find(c => c.id == childId);
        knex('chores')
          .where('child_id', childId)
          .orderBy('created_at')
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
            .orderBy('created_at')
            .then((completedChores)=>{
              for (let completedChore of completedChores) {
                let thisChore = chores.find(c => c.id === completedChore.chore_id);
                thisChore.completed = true;
                thisChore.approved = completedChore.approved;
              }
              //add chores for each child to child object
              child.chores = chores;
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

  editChild: function(req, res) {
    let child = { id: req.params.child };
    // set child properties to only those that were sent in
    if (req.body.first_name.length) child.first_name = req.body.first_name;
    if (req.body.username.length) child.username = req.body.username;
    if (req.body.password.length) child.password = req.body.password;
    encryption.hash(req.body).then(encryptedUser=>{
      knex('users')
        .update(encryptedUser)
        .where('id',child.id)
        .limit(1)
        .then(()=>{
          req.session.save(err=>{
            res.redirect('/family/' + child.id);
          });
        })
    })
    .catch((err) => {
      console.log(err);
      req.session.message = "Error editing information. Please try again.";
      req.session.save(err=>{
        res.redirect('/family/'+child.id);
      });
    });
  },

  deleteChild: function(req, res) {
    let childId = req.params.child;
    console.log('bark!')
    knex('users')
      .del()
      .where('id', childId)
      .limit(1)
      .then(()=>{
        req.session.save(err=>{
          res.redirect('/family');
        });
      })
      .catch((err)=>{
        console.log(err);
        req.session.message = "Error: Could not delete child. Please try again.";
        req.session.save(err=>{
          res.redirect('/family/' + childId);
        });
      });
  },

  createChore: function(req, res) {
    let childId = req.params.child;
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
          res.redirect('/family/' + childId);
        });
      })
      .catch((err) => {
        console.log(err);
        req.session.message = "Error adding chore. Please try again."
        req.session.save(err=>{
          res.redirect('/family/' + childId);
        });
      });
  },

  editChore: function(req, res) {
    let childId = req.params.child;
    let choreId = req.params.chore;
    let chore = {
      title: req.body.title,
      value: req.body.value,
      child_id: req.body.child_id
    };
    if (req.body.description) chore.description = req.body.description;
    if (req.body.start_date) chore.start_date = req.body.start_date;
    if (req.body.end_date) chore.end_date = req.body.end_date;
    knex('chores')
      .update(chore)
      .where('id', choreId)
      .limit(1)
      .then((result)=>{
        req.session.save(err=>{
          res.redirect('/family/' + childId);
        });
      })
      .catch((err) => {
        console.log(err);
        req.session.message = "Error updating chore. Please try again."
        req.session.save(err=>{
          res.redirect('/family/' + childId);
        });
      });
  },

  deleteChore: function(req, res) {
    let childId = req.params.child;
    knex('chores')
      .del()
      .where('id',req.params.chore)
      .limit(1)
      .then(()=>{
        req.session.save(err=>{
          res.redirect('/family/' + childId );
        });
      })
      .catch((err)=>{
        console.log(err);
        req.session.message = "Error deleting chore. Please try again.";
        req.session.save(err=>{
          res.redirect('/family/' + childId);
        });
      });
  },

  uncompleteChore: function(req, res){
    knex('completed_chores')
    .del()
    .where(
      "chore_id", req.params.chore
    )
    .limit(1)
    .then(()=>{
      res.redirect('/family/' + req.params.child);
    })
    .catch((err) => {
      console.log(err);
      req.session.message = "Error marking chore as incomplete."
      req.session.save(err=>{
        res.redirect('/family/' + req.params.child);
      });
    });
  },

  completeChore: function(req, res){
    knex('completed_chores')
    .insert({
     chore_id: req.params.chore
    })
    .then(()=>{
      res.redirect('/family/' + req.params.child);
    })
    .catch((err) => {
      console.log(err);
      req.session.message = "Error marking chore as complete."
      req.session.save(err=>{
        res.redirect('/family/' + req.params.child);
      });
    });
  },

  unapproveChore: function(req, res){
    knex('completed_chores')
    .update({
      approved: false
    })
    .where(
      "chore_id", req.params.chore
    )
    .limit(1)
    .then(()=>{
      res.redirect('/family/' + req.params.child);
    })
    .catch((err) => {
      console.log(err);
      req.session.message = "Error marking chore as unapproved."
      req.session.save(err=>{
        res.redirect('/family/' + req.params.child);
      });
    });
  },

  approveChore: function(req, res){
    knex('completed_chores')
    .update({
      approved: true
    })
    .where(
      "chore_id", req.params.chore
    )
    .limit(1)
    .then(()=>{
      res.redirect('/family/' + req.params.child);
    })
    .catch((err) => {
      console.log(err);
      req.session.message = "Error marking chore as approved."
      req.session.save(err=>{
        res.redirect('/family/' + req.params.child);
      });
    });
  }
}

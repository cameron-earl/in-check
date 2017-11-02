const main = require("../controllers/main.js");
const family = require("../controllers/family.js");
const child = require("../controllers/child.js");


module.exports = function(app){

  app.get('/', main.index);

  app.get('/register', main.registerPage);

  app.post('/register', main.register);

  app.post('/login', main.login);

  app.get('/logout', main.logout);

  app.use(childAuth)

  app.get('/child', child.index);

  app.get('/chore/incomplete/:id', child.incomplete);

  app.get('/chore/complete/:id', child.complete);

  app.use(parentAuth);

  app.get('/family', family.index);

  app.get('/family/children/:id', family.viewChild);

  app.post('/family/children/add', family.createChild);

  app.get('/family/children/edit/:id', family.editChildPage);

  app.post('/family/children/edit/:id', family.editChild);

  app.get('/family/children/delete/:id', family.deleteChild);

  app.post('/family/chores/add', family.createChore);

  app.post('/family/chores/edit/:id', family.editChore);

  app.get('/family/chores/delete/:id', family.deleteChore);

}

function childAuth(req, res, next) {
  if(req.session.auth) {
    next();
  } else {
    req.session.message = "You need to log in!";
    req.session.save(err => {
      res.redirect('/');
    })
  }
}

function parentAuth(req, res, next) {
  if(req.session.auth === "parent") {
    next();
  } else {
    req.session.message = "You must be logged in as a parent to access this page.";
    req.session.save(err => {
      res.redirect('/');
    })
  }
}

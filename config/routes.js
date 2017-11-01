const main = require("../controllers/main.js");
const family = require("../controllers/family.js");
const child = require("../controllers/child.js");


module.exports = function(app){

  app.get('/', main.index);

  app.get('/register', main.registerPage);

  app.post('/register', main.register);

  app.post('/login', main.login);

  app.use(childAuth)

  app.get('/child', child.index);

  app.use(parentAuth);

  app.get('/family', family.index);

  app.get('/family/children/:id', family.viewChild);

  app.post('/family/children/add', family.createChild);

  app.post('/family/chores/add', family.createChore);

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

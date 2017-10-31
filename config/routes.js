const main = require("../controllers/main.js");
const family = require("../controllers/family.js");
const child = require("../controllers/child.js");


module.exports = function(app){

  app.get('/', main.index);

  app.get('/register', main.registerPage);

  app.post('/register', main.register);

  app.post('/family', family.login);

  app.use(userAuth);

  app.get('/family', family.index);

  app.post('/family/addChild', child.createChild);

  app.use(userAuth);

}

function userAuth(req,res,next){
  if(req.session.family){
    next();
  }else{
    req.session.message = "You are not authorized to view that page.";
    req.session.save(err => {
      res.redirect('/');
    })
  }
}

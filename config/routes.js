const main = require("../controllers/main.js");

module.exports = function(app){

  app.get('/', main.index);

  app.get('/register', main.registerPage);


  app.post('/register', main.register);

  app.use(userAuth);

}

function userAuth(req,res,next){
  if(req.session.admin){
    next();
  }else{
    req.session.message = "You are not authorized to view that page.";
    req.session.save(err => {
      res.redirect('/');
    })
  }
}

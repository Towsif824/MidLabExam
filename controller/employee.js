var express = require('express');
var router = express.Router();
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-model');


router.get('/',function(req,res){
  
  if(req.session.username== null){
    res.redirect('/login');
  }
  else{
    var sql = "select * from users where username='"+req.session.username+"'";
    db.getResults(sql,function(results){

      res.render('employee',{userlist: results[0], name : req.session.username});
    });
  }

});

module.exports = router;

var express = require('express');
var db 		= require.main.require('./models/db');
var router 	= express.Router();


router.get('/',function(req,res){
  res.render('login/index');
});

router.post('/',function(req,res){

  var sql = "select * from users where username='"+req.body.username+"' and password='"+req.body.password+"'";

  db.getResults(sql,function(results){
  	
    if(results.length > 0){
      req.session.username= results[0].username;

      if(results[0].type=="admin"){
        res.redirect('/admin');
        console.log(results);
      }
      else{
        res.redirect('/employee');
      }
    }
    else{
      res.redirect('/login');
      res.send('invalid username/password');
    }
  });
  });


module.exports = router;
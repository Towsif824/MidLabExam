var express = require('express');
var router = express.Router();
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-models');

router.get('/',function(req,res){

  if(req.session.username== null){
    res.redirect('/login');
  }
  else{
    var sql = "select * from users where username='"+req.session.username+"'";
    db.getResults(sql,function(results){

      res.render('admin',{userlist: results[0], name : req.session.username});
    });
  }
});

router.post('/',function(req,res){
  if(req.body.choice=="AddEmployee"){
    res.redirect('/admin/AddEmployee');
  }
  else if(req.body.choice=="AllEmployeeList"){
    res.redirect('/admin/AllEmployeeList');
  }
  else if(req.body.choice=="Logout"){
    req.session.username=null;
    res.redirect('/login');
  }
});



module.exports = router;
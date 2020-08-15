var express = require('express');
var router = express.Router();
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-model');


router.get('/',function(req,res){
  
  if(req.session.username== null){
    res.redirect('/logout');
  }
  else{
  	res.render('employee');
  }

});

router.post('/',function(req,res){
	if (req.body.choice == "myProfile"){
		res.redirect('/employee/myProfile');
	}else if(req.body.choice =="updateProfile"){
		res.redirect('/employee/updateProfile');
	}	
	
});

router.get('/myProfile',function(req,res){

      userModel.getUserByUsername(req.session.username, function(results){
        if(results.length > 0){
             res.render('employee/myProfile',{userlist: results[0]});
          }else{
             console.log('Search not found');
          }
      });
});

module.exports = router;

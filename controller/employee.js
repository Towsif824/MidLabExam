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
		res.redirect('/employee/updateProfile/');
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


router.get('/updateProfile', function(req, res){

	userModel.getUserByUsername(req.session.username, function(result){
		res.render('employee/updateProfile', {user: result[0]});
	});

});

router.post('/updateProfile/:id', function(req, res){

  var user = {
  	
  	name 			: req.body.name,
  	username 		: req.body.username,
    password     	: req.body.password,
    phone     	 	: req.body.phone,
    gender 			: req.body.gender,
	id 				: req.params.id
	
	}

	userModel.updateEmployee(user, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.redirect('/employee/updateEmployee/'+req.params.id);
		}
	});
});
module.exports = router;

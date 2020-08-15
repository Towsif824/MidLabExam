var express = require('express');
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-model');
var router 	= express.Router();


router.get('/',function(req,res){
  res.render('login/index');
});

router.post('/',function(req,res){

	var user ={
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){

		if(status){

			userModel.getUserByUsername(req.body.username, function(results)
				{
					req.session.username = user.username;

					if(results[0].type == "admin")
						{
							res.redirect('/admin');
						}
					else if (results[0].type =="employee")
						{
							res.redirect('/employee')
						}
				});
			}
		else{
			res.send('invalid username or password');
		}
	});
});




module.exports = router;
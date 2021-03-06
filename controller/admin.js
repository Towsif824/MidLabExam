var express = require('express');
var router = express.Router();
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-model');

router.get('/',function(req,res){

  
  if(req.session.username== null){
    res.redirect('/logout');
  }
  else{
    var sql = "select * from users where username='"+req.session.username+"'";
    db.getResults(sql,function(results){

      res.render('admin',{userlist: results[0], name : req.session.username});
    });
  }
});

router.post('/',function(req,res){
  
  if(req.body.choice=="addEmployee"){
    res.redirect('/admin/addEmployee');
  }
  else if(req.body.choice=="AllEmpList"){
    res.redirect('/admin/AllEmpList');
  }
  else if(req.body.choice=="Logout"){
    req.session.username=null;
    res.redirect('/login');
  }

});

router.get('/AllEmpList', function(req, res){

  userModel.getallEmployee("employee",function(results){
    console.log(results);
    res.render('admin/allEmployee', { userList : results, username: req.session.username});
  });
});

router.post('/AllEmpList', function(req, res){
  var search = req.body.search;
  if(search == ""){
    res.redirect('/admin/AllEmpList');
  }
  else{
        userModel.getSearch(search,"employee", function(results){
          if(results.length > 0){
               res.render('admin/search',{userList: results});
            }else{
               console.log('this employee does not exist!');
                res.send(500,'No employee of this name exist');
            }
      });
    }
});

router.get('/addEmployee',function(req,res){
  if(req.session.username !=null){
    res.render('admin/addEmployee');
  }else{
    res.redirect('/logout');
  }
});

router.post('/addEmployee',function(req,res){
  if(req.session.username != null){

          var user ={
            name        : req.body.name,
            username    : req.body.username,
            password    : req.body.password,
            phone       : req.body.phone,
            address     : req.body.address,
            gender      : req.body.gender,
            designation : req.body.designation,
            type        : req.body.type
          }

          userModel.insert(user, function(status){
            if(status){
              res.redirect('/admin/AllEmpList');
            }else{
              res.redirect('/admin/addEmployee');
            }
          });
  }else{
    res.redirect('/logout');
  }
});

router.get('/update/:id', function(req, res){

  userModel.getById(req.params.id, function(result){
    res.render('admin/update',{user : result});
  });
});

router.post('/update/:id', function(req, res){

  var user = {

    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    designation :req.body.designation,
    id: req.params.id
  };

  userModel.update(user, function(status){
    if(status){
      res.redirect('/admin/AllEmpList');

    }else{
      res.redirect('/admin/update/'+req.params.id);
    }
  });
});
router.get('/delete/:id', function(req, res){

  userModel.getById(req.params.id, function(result){
    res.render('admin/delete', {user: result});
  });

});

router.post('/delete/:id', function(req, res){

  userModel.delete(req.params.id, function(status){
    if(status){
      res.redirect('/admin/AllEmpList');
    }else{
      res.redirect('/admin/delete');
    }
  });
});



module.exports = router;
var db = require('./db');

module.exports ={

	validate: function(user, callback){
    var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
    db.getResults(sql, function(result){
      if(result.length > 0){
        callback(true);
      }else{
        callback(false);
      }
    });
  },
  

  		getById: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
     	console.log('user module error')
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getUserByUsername: function(username, callback){
    	var sql = "select * from users where username='"+username+"'";
   		db.getResults(sql, function(result){
      console.log('user module error')
      		if(result.length > 0){
        	callback(result);
      		}else{
        	callback([]);
      		}
   		});
	},

	 getallEmployee:function(type,callback){
		var sql = "select * from users where type='"+type+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAll:function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},



}
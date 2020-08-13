var db = require('./db');

module.exports ={
  

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
var express = require('express');
var router = express.Router();
var UserModel = require('./user.model').UserModel;
var crypto = require('crypto');
function encrypt(str){
  return crypto.createHash('md5').update(str).digest('hex');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user',function(req,res){

  return UserModel.find(function(err,users){
    if(!err){

      return res.send(users);
    } else {
      res.statusCode == 500;
      console.log("Internal error(%d):%s",res.statusCode,err.message);

      return res.send({error:'Server error'});
    }
  })
})

router.post('/user',function(req,res){

  console.log('req body' + req.body);
  var user = new UserModel({
    telphone:req.body.telphone,
    password:encrypt(req.body.password)
  })

  user.save(function(err){

    if(!err){
      console.log("User "+ user.username + "created!");
      res.send({status:'OK',user:user});

    } else{

      res.statusCode = 500;
      res.send({err:err+""});

    }
  })
})


router.get('/user/:id',function(req,res){
  return UserModel.findById(req.params.id,function(err,user){
    if(!user){
      res.statusCode == 400;
      return res.send({error:"Not found"});
    }
    if(!err){
      return res.send({status:"OK",user:user});
    } else {
      res.statusCode == 500;
      console.log("Internal error(%d):%s",res.statusCode,err.message);
      return res.send({error:'Server error'});
    }
  })
})

router.delete('/user/:id',function(req,res){
  return UserModel.findById(req.params.id,function(err,user){
    if(!user){
      res.statusCode == 400;
      return res.send({error:"Not found"});
    }
    if(!err){
      return user.remove(function(err){
        if(!err){
          console.log("User removed");
          return res.send({status:'OK'});
        }else{
          res.statusCode == 500;
          console.log("Internal error(%d):%s",res.statusCode,err.message);
          return res.send({error:'Server error'});
        }
      })
    } else {
      res.statusCode == 500;
      console.log("Internal error(%d):%s",res.statusCode,err.message);
      return res.send({error:'Server error'});
    }
  })
})

router.put('/user/:id',function(req,res){

  return UserModel.findById(req.params.id,function(err,user){

    if(!user){
      res.statusCode == 400;
      return res.send({error:"Not found"});
    }
    user.telphone = req.body.telphone;
    user.password = encrypt(req.body.password);

    return user.save(function(err){
      console.log(err);
      if(!err){

        console.log("User updated");
        return res.send({status:'OK',user:user});
      }else{

        if(err.name == "ValidationError"){
          res.statusCode = 400;
          res.send({error:'Validation error'});
        }else{
          res.statusCode = 500;
          res.send({error:"server error"});
        }
        console.log("Internal error(%d): %s",res.statusCode,err.message);
      }

    })

  })
})

module.exports = router;

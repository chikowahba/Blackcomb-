const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var {User} = require('../models/user');

exports.login =  (req,res,next) => {
	User.find({email:req.body.email})
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(401).json({
				message: 'Auth faild'
			})
		}
		bcrypt.compare(req.body.password, user[0].password,(err,result) => {
			if (err) {
				return res.status(401).json({
					message: 'Auth faild'
				})
			}
			if (result) {
			  const token =	jwt.sign({
					email:user[0].email,
					userId:user[0]._id
				},
				process.env.JWT_KEY, {
					expiresIn:"1h"
				})
				return res.status(200).json({
					message:'login sucess',
					token:token
				})
			}
			res.status(401).json({
					message: 'Auth faild'
			})
		})
	})
	.catch(err=>{
		res.status(400).send();
	})
}

exports.signup = (req,res ) => {
	User.find({
		email:req.body.email
	})
	.then(user=>{
			if (user.length >=1) {
				return res.status(409).json({
					message:"mail exsits"
				})
			}
			else {
				bcrypt.hash(req.body.password,10,(err,hash)=> {
					if (err) {
						return res.status(500).json({
							error:err
						})
					}
					else {
						var user = new User ({
								email:req.body.email,
								password:hash
						});
						user.save().then((doc)=>{
							console.log(doc);
								res.send(doc);
						},(e)=>{
								res.status(400).send(e);
						});
					}
				})
			}
	})
}

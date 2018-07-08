// libery imports
var express = require('express');
var bodyParser = require ('body-parser');
let axios = require('axios');
const bcrypt = require ('bcryptjs')
// local imports
const {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var jwt = require('jsonwebtoken');
var {Contact} = require('./models/Contact');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
		return res.status(200).json({});
	}
	next();
});
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/contact', (req,res)=>{
    var contact = new Contact ({
        firstName:req.body.firstName,
				lastName:req.body.lastName,
				email:req.body.email,
				number:req.body.number
    });
    contact.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });

});
app.delete('/contact/:id' ,authenticate, (req, res) => {
  var id = req.params.id;
  Contact.findByIdAndRemove(id).then((contact) => {
    if (!contact) {
      return res.status(404).send();
    }

    res.send({contact});
  }).catch((e) => {
    res.status(400).send();
  });
});
app.patch('/contact/:id' ,authenticate, (req, res) => {
  var id = req.params.id;
  var body =req.body;
  Contact.findByIdAndUpdate(id, {$set: body}, {new: true}).then((contact) => {
    if (!contact) {
      return res.status(404).send();
    }

    res.send({contact});
  }).catch((e) => {
    res.status(400).send();
  })
});
app.get('/contact',(req,res)=>{
    Contact.find().then((contacts)=>{
        res.send({contacts})
    },(e) => {
        res.status(400).send(e);
    })
})


app.post('/signup', (req,res)=>{
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
});

app.post('/login', (req,res,next)=>{
	User.find({
		email:req.body.email
	})
	.exec()
	.then(user => {
		if (user.length < 1) {
			return res.status(401).json({
				message: 'Auth faild'
			})
		}
		bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
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
				process.env.JWT_KEY,
				{
					expiresIn:"1h"
				}
				)
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
});


app.listen(port, () => {
    console.log(`start port 3001 ${port}`);
});

module.exports = {app};

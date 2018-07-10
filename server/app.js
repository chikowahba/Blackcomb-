const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require ('body-parser');
const contactRoutes = require('./routs/Contact');
const userRouts = require('./routs/User');

app.use(bodyParser.json());

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/contact', contactRoutes);
app.use('/user', userRouts);

module.exports = app;

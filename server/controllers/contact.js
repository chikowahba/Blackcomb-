var {Contact} = require('../models/Contact');

exports.get_all = (req,res) => {
    Contact.find()
    .then((contacts)=>{
        res.send({contacts})
    },
    (e) => {
        res.status(400).send(e);
    })
}

exports.insert = (req,res) => {
    var contact = new Contact ({
        firstName:req.body.firstName,
				lastName:req.body.lastName,
				email:req.body.email,
				number:req.body.number
    });
    contact.save().then((doc)=>{
      res.send(doc);
    },
    (e)=>{
        res.status(400).send(e);
    });
}

exports.edit = (req, res) => {
  var id = req.params.id;
  var body =req.body;
  Contact.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((contact) => {
    if (!contact) {
      return res.status(404).send();
    }
    res.send({contact});
    })
    .catch((e) => {
      res.status(400).send();
  })
}

exports.delete = (req, res) => {
  var id = req.params.id;
  Contact.findByIdAndRemove(id).then((contact) => {
    if (!contact) {
      return res.status(404).send();
    }

    res.send({contact});
    })
    .catch((e) => {
      res.status(400).send();
  });
}

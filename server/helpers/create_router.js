const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

//bird home route  
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

//bird show route  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

//bird create route
  router.post('/', (req, res) => {
    const newBird = req.body;
    collection
    .insertOne(newBird)
    .then(result => res.json(result.ops[0]))
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({status: 500, error: err})
    })
  })  

  //bird delete route
  router.delete('/:id', (req,res) => {
    const id = req.params.id;
    collection.deleteOne({_id: ObjectID(id)})
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({status: 500, error: err})
    })
  })

  return router;
};

module.exports = createRouter;

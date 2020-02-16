const express = require('express');
const router = express.Router();
const db = require('../models');
const { Projects, sequelize} = db;
const squel = require("squel").useFlavour("postgres");
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');




const fieldReg = /([a-zA-Z]*)\.([a-zA-Z]*)/g;
const quote = txt => txt.replace(fieldReg, `"$1"."$2"`);

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?

const toLiteral = query => Sequelize.literal(`(${quote(query.toString())})`);


const COUNT_ITEMS = squel
  // don't use squel `autoQuoteAliasNames`
  // • isn't reliable enough for our sub-queries
  .select({ autoQuoteAliasNames: false })
  // force integer on count
  .field(`SUM(projects.Hours)`)
  .where(`projects.Billable = 'Y'`)
  .from("projects");
  
  /*
SELECT "Client", "Project", SUM("Hours") as "Hours", SUM(CASE WHEN "Billable" = 'Yes' THEN "Hours" ELSE 0 END) as "BillableHours", (SUM(CASE WHEN "Billable" = 'Yes' THEN "Hours" * "Billable_Rate" ELSE 0 END)) as "Billable" 
from projects A
Group by "Project", "Client"
ORDER BY "BillableHours" DESC;
*/


router.get('/', async (req,res) => {
  const val = await sequelize.query(
    `SELECT "Client", "Project", SUM("Hours") as Hours, SUM(CASE WHEN "Billable" = 'Yes' THEN "Hours" ELSE 0 END) as "BillableHours", (SUM(CASE WHEN "Billable" = 'Yes' THEN "Hours" * "Billable_Rate" ELSE 0 END)) as Billable from projects A Group by "Project", "Client" ORDER BY "BillableHours" DESC;`
    ,
    {
      type: QueryTypes.SELECT
    }
  );
  return res.json(val);
});


router.post('/', (req, res) => {
  let { content } = req.body;
  
  Projects.create({ content })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      res.json(post);
    });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  Projects.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.content = req.body.content;
      post.save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Projects.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.destroy();
      res.sendStatus(204);
    });
});


module.exports = router;
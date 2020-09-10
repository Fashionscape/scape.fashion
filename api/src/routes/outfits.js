const Knex = require('knex');
const express = require('express');
const asyncM = require('express-async-handler');
const {Model} = require('objection');

const router = express.Router();

const knex = Knex({
  client: 'sqlite3',
  connection: {filename: 'outfits.db'},
});

Model.knex(knex);

class Outfit extends Model {
  static get tableName() {
    return 'outfits';
  }
}

const PAGE_SIZE = 100;

router.get(
  '/',
  asyncM(async (req, res) => {
    const page = Number(req.query.page) || 0;
    const tag = req.query.tag || 'osrs';

    const outfits = await Outfit.query()
      .where({tag})
      .page(page, PAGE_SIZE);

    res.json(outfits);
  }),
);

module.exports = router;

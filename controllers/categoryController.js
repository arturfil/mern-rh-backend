const Category = require('../models/Category');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        mesasge: "Categories not found"
      });
    }
    res.json(data);
  })
}

exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({data});
  })
}
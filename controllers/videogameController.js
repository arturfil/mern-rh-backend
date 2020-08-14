const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Videogame = require('../models/Videogame');

exports.test = (req, res) => {
  res.json({message: "This works"});
}

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'name'

  Videogame.find()
    .select("-image")
    .populate('category')
    .sort([[sortBy, order]])
    .exec((err, videogames) => {
      if (err) {
        return res.status(400).json({
          message: "Videogames not found"
        })
      }
      res.json(videogames);
    })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }

    const { name, description, price, category, quantity } = fields
    let videogame = new Videogame(fields);

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

    if (files.image) {
      if (files.image.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size"
        })
      }
      videogame.image.data = fs.readFileSync(files.image.path)
      videogame.image.contentType = files.image.type
    }

    videogame.save((err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Couldn't save the videogame, please try again"
        })
      }
      res.json(result);
    })

  })
}

exports.image = (req, res, next) => {
  if (req.videogame.image.data) {
    res.set('Content-Type', req.videogame.image.contentType)
    return res.send(req.videogame.image.data);
  }
  next();
}

exports.videogameById = (req, res, next, id) => {
  Videogame.findById(id)
    .populate("category")
    .exec((err, videogame) => {
      if (err || !videogame) {
        return res.status(400).json({
          error: "Videogame not found"
        });
      }
      req.videogame = videogame;
      next();
    })
}
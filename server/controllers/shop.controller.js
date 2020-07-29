import formidable from 'formidable';
import fs from 'fs';
import Shop from '../models/shop.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: 'Image could not be uploaded',
      });
    }
    const shop = new Shop(fields);
    shop.owner = req.profile;
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path);
      shop.image.contentType = files.image.type;
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.status(200).json(result);
    });
  });
};

const list = (req, res) => {
  Shop.find((err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(shops);
  });
};

const listByOwner = (req, res) => {
  Shop.find({ owner: req.profile._id }, (err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(shops);
  }).populate('owner', '_id name');
};

export default {
  create,
  list,
  listByOwner,
};

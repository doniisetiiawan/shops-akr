import formidable from 'formidable';
import fs from 'fs';
import extend from 'lodash/extend';
import Product from '../models/product.model';
import errorHandler from '../helpers/dbErrorHandler';
import defaultImage from '../../client/assets/images/profile-pic.png';

const create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: 'Image could not be uploaded',
      });
    }
    const product = new Product(fields);
    product.shop = req.shop;
    if (files.image) {
      product.image.data = fs.readFileSync(
        files.image.path,
      );
      product.image.contentType = files.image.type;
    }
    try {
      const result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const productByID = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id)
      .populate('shop', '_id name')
      .exec();
    if (!product) {
      return res.status('400').json({
        error: 'Product not found',
      });
    }
    req.product = product;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
};

const photo = (req, res, next) => {
  if (req.product.image.data) {
    res.set('Content-Type', req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => res.sendFile(process.cwd() + defaultImage);

const read = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

const update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: 'Photo could not be uploaded',
      });
    }
    let { product } = req;
    product = extend(product, fields);
    product.updated = Date.now();
    if (files.image) {
      product.image.data = fs.readFileSync(
        files.image.path,
      );
      product.image.contentType = files.image.type;
    }
    try {
      const result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const remove = async (req, res) => {
  try {
    const { product } = req;
    const deletedProduct = await product.remove();
    res.json(deletedProduct);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByShop = async (req, res) => {
  try {
    const products = await Product.find({
      shop: req.shop._id,
    })
      .populate('shop', '_id name')
      .select('-image');
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listLatest = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort('-created')
      .limit(5)
      .populate('shop', '_id name')
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listRelated = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(5)
      .populate('shop', '_id name')
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listCategories = async (req, res) => {
  try {
    const products = await Product.distinct('category', {});
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: 'i',
    };
  }
  if (req.query.category && req.query.category != 'All') query.category = req.query.category;
  try {
    const products = await Product.find(query)
      .populate('shop', '_id name')
      .select('-image')
      .exec();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const decreaseQuantity = async (req, res, next) => {
  const bulkOps = req.body.order.products.map((item) => ({
    updateOne: {
      filter: { _id: item.product._id },
      update: { $inc: { quantity: -item.quantity } },
    },
  }));
  try {
    await Product.bulkWrite(bulkOps, {});
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not update product',
    });
  }
};

const increaseQuantity = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(
      req.product._id,
      { $inc: { quantity: req.body.quantity } },
      { new: true },
    ).exec();
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  listByShop,
  listLatest,
  productByID,
  listRelated,
  read,
  update,
  remove,
  listCategories,
  list,
  decreaseQuantity,
  increaseQuantity,
  photo,
  defaultPhoto,
};

const Product = require("../models/Product");
const fs = require("fs");

module.exports = class API {
  //fetch all products
  static async fetchAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //fetch product by id
  static async fetchProductByID(req, res) {
    const id = req.params.id;
    try {
      const product = await Product.findByPk(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //create product
  static async createProduct(req, res) {
    const product = req.body;
    const imagename = req.file.filename;
    product.images = imagename;
    try {
      await Product.create(product);
      res.status(201).json({ message: "Product create successfully!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //update product
  static async updateProduct(req, res) {
    const id = req.params.id;
    let new_images = "";
    if (req.file) {
      new_images = req.file.filename;
      try {
        fs.unlinkSync("./uploads" + req.body.old_images);
      } catch (error) {
        console.log(error);
      }
    } else {
      new_images = req.body.old_images;
    }
    const newProduct = req.body;
    newProduct.images = new_images;

    try {
      await Product.update(newProduct, { where: { id: id } });
      res.status(200).json({ message: "Product updated successfuly!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //delete product
  static async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      const result = await Product.destroy({ where: { id: id } });
      if (result.images != "") {
        try {
          fs.unlinkSync("./uploads/" + result.images);
        } catch (error) {
          console.log(error);
        }
      }
      res.status(200).json({ message: "Product deleted successfuly!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

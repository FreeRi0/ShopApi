import axios from "axios";
const url = "/api/products";

export default class API {

  static async getAllProducts() {
    const res = await axios.get(url);
    return res.data;
  }

  static async getProductById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // to insert post into db

  static async addProduct(product) {
    const res = await axios.post(url, product);
    return res.data;
  }

  // to update post into db

  static async updateProduct(id, product) {
    const res = await axios.patch(`${url}/${id}`, product);
    return res.data;
  }

  // to delete a post

  static async deleteProduct(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}

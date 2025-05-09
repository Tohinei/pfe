import { odooLogin } from "../db/connectToOdoo.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const ODOO_URL = process.env.ODOO_URL;
const DB = process.env.ODOO_DATABASE;
const PASSWORD = process.env.ODOO_PASSWORD;

export const getProducts = async (req, res) => {
  try {
    const uid = await odooLogin();
    if (!uid) throw new Error("Failed to authenticate with Odoo");

    const products = await axios.post(`${process.env.ODOO_URL}/jsonrpc`, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          process.env.ODOO_DATABASE,
          uid,
          process.env.ODOO_PASSWORD,
          "product.product",
          "search_read",
          [[]],
          { fields: ["name", "list_price"]  },
        ],
      },
      id: 1,
    });

    return res.json(products.data.result);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const addProduct = async (req, res) => {
  try {
    return res.json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    return res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProductById = async (req, res) => {
  try {
    return res.json({ message: "Product fetched successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

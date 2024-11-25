import { Product } from "../models/ecommerce/product.models.js";
import { Inventory } from "../models/ecommerce/inventory.models.js";

export const inventoryService = {
  checkStock: async (productId, requiredQuantity) => {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.stock < requiredQuantity) {
      throw new Error(`Not enough stock for product: ${product.name}`);
    }
    return true;
  },

  deductStock: async (productId, quantity, reason, userId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    if (product.stock < quantity) {
        throw new Error(`Not enough stock for product: ${product.name}`);
    }

    product.stock -= quantity;
    await product.save();

    await Inventory.create({
        product: productId,
        change: quantity, // Log positive value
        reason,
        user: userId,
        type: "deduct", // Log type as "deduct"
    });

    return product;
},

  addStock: async (productId, quantity, reason, userId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    product.stock += quantity;
    await product.save();

    await Inventory.create({
        product: productId,
        change: quantity,
        reason,
        user: userId,
        type: "add", // Log type as "add"
    });

    return product;
  },
};

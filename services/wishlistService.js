import { Wishlist } from "../models/ecommerce/wishlist.models.js";
import { Product } from "../models/ecommerce/product.models.js";

export const wishlistService = {
  getWishlist: async (userId) => {
    return await Wishlist.findOne({ user: userId }).populate("products");
    
  },

  addToWishlist: async (userId, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    } else {
      throw new Error("Product already in wishlist");
    }

    await wishlist.save();
    return wishlist.populate("products");
  },

  removeFromWishlist: async (userId, productId) => {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    );
    await wishlist.save();
    return wishlist.populate("products");
  },
};

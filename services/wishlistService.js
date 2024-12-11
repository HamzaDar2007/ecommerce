import { Wishlist } from "../models/ecommerce/wishlist.models.js";
import { Product } from "../models/ecommerce/product.models.js";


export const wishlistService = {
  getWishlist: async (userId) => {
      const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
      return wishlist || { products: [] }; 
  },

  addToWishlist: async (userId, productId) => {
      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
          wishlist = new Wishlist({ user: userId, products: [] });
      }

      if (wishlist.products.includes(productId)) {
          throw new Error("Product is already in the wishlist");
      }

      wishlist.products.push(productId);
      return await wishlist.save();
  },

  removeFromWishlist: async (userId, productId) => {
      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
          throw new Error("Wishlist not found");
      }

      wishlist.products = wishlist.products.filter(
          (product) => product.toString() !== productId
      );

      return await wishlist.save();
  },

  clearWishlist: async (userId) => {
      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
          throw new Error("Wishlist not found");
      }

      wishlist.products = [];
      return await wishlist.save();
  },
};
import { Cart } from "../models/ecommerce/cart.models.js";
import { Product } from "../models/ecommerce/product.models.js";

export const cartService = {
    getCart: async (userId) => {

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return cart || { items: [] }; 
    },

    addToCart: async (userId, productId, quantity) => {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the user has no cart, create one
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity;
        } else {
            // Add new product to the cart
            cart.items.push({ product: productId, quantity });
        }

        return await cart.save();
    },

    removeFromCart: async (userId, productId) => {
        const cart = await Cart.findOne({ user: userId });
    
        if (!cart) {
            throw new Error("Cart not found");
        }
    
        // Filter out the product to be removed
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    
        // Save the updated cart
        return await cart.save();
    },
    

    clearCart: async (userId) => {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.items = []; 
        return await cart.save();
    },
};

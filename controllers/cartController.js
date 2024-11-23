import { cartService } from "../services/cartService.js";

export const cartController = {
    getCart: async (req, res) => {
        try {
            const cart = await cartService.getCart(req.user.id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addToCart: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const updatedCart = await cartService.addToCart(req.user.id, productId, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const { productId } = req.body; // Extract productId from the request body
    
            if (!productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }
    
            const updatedCart = await cartService.removeFromCart(req.user.id, productId);
            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error("Error in removeFromCart:", error.message);
            return res.status(500).json({ message: error.message });
        }
    },
    
    
    clearCart: async (req, res) => {
        try {
            const clearedCart = await cartService.clearCart(req.user.id);
            res.status(200).json(clearedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

import { wishlistService } from "../services/wishlistService.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await wishlistService.addToWishlist(req.user.id, productId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await wishlistService.removeFromWishlist(
      req.user.id,
      productId
    );
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

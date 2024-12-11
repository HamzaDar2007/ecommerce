import { wishlistService } from "../services/wishlistService.js";
import { emailService } from "../services/emailService.js";

export const wishlistController = {
  getWishlist: async (req, res) => {
      try {
          const wishlist = await wishlistService.getWishlist(req.user.id);
          res.status(200).json(wishlist);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  },

  addToWishlist: async (req, res) => {
      try {
          const { productId } = req.body;
          const updatedWishlist = await wishlistService.addToWishlist(req.user.id, productId);
          res.status(200).json(updatedWishlist);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  },

  removeFromWishlist: async (req, res) => {
      try {
          const { productId } = req.body;

          if (!productId) {
              return res.status(400).json({ message: "Product ID is required" });
          }

          const updatedWishlist = await wishlistService.removeFromWishlist(req.user.id, productId);
          res.status(200).json(updatedWishlist);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  },

  clearWishlist: async (req, res) => {
      try {
          const clearedWishlist = await wishlistService.clearWishlist(req.user.id);
          res.status(200).json(clearedWishlist);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  },

  shareWishlist: async (req, res) => {
    try {
        const { email } = req.body; // Email address to share with
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Get the user's wishlist
        const wishlist = await wishlistService.getWishlist(req.user.id);

        if (!wishlist.products || wishlist.products.length === 0) {
            return res.status(400).json({ message: "Wishlist is empty" });
        }

        // Generate an email content
        const emailContent = `
            <h1>${req.user.name}'s Wishlist</h1>
            <ul>
                ${wishlist.products
                    .map(
                        (product) => `
                    <li>
                        <strong>${product.name}</strong><br />
                        Description: ${product.description}<br />
                        Price: $${product.price.toFixed(2)}
                    </li>
                `
                    )
                    .join("")}
            </ul>
        `;

        // Send the email
        await emailService.sendEmail({
            to: email,
            subject: `${req.user.name} has shared their wishlist with you!`,
            html: emailContent,
        });

        res.status(200).json({ message: "Wishlist shared successfully" });
    } catch (error) {
        console.error("Error sharing wishlist:", error.message);
        res.status(500).json({ message: error.message });
    }
  }
};

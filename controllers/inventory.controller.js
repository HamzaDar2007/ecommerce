import { inventoryService } from "../services/inventory.service.js";

export const inventoryController = {
  addStock: async (req, res) => {
      try {
          const { productId, quantity, reason } = req.body;
          const updatedProduct = await inventoryService.addStock(
              productId,
              quantity,
              reason,
              req.user.id
          );
          res.status(200).json(updatedProduct);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  },

  deductStock: async (req, res) => {
    try {
      const { productId, quantity, reason } = req.body;
      const product = await inventoryService.deductStock(
        productId,
        quantity,
        reason,
        req.user.id // Admin or system user making the change
      );
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  checkStock: async (req, res) => {
    try {
      const { productId, requiredQuantity } = req.body;
      await inventoryService.checkStock(productId, requiredQuantity);
      res.status(200).json({ message: "Stock is sufficient" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

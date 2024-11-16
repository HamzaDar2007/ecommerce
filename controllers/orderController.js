// controllers/orderController.js
import { orderService } from "../services/orderService.js";

export const orderController = {
    createOrder: async (req, res) => {
        try {
            const newOrder = await orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await orderService.getOrderById(req.params.id);
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
            if (updatedOrder) {
                res.json(updatedOrder);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const deletedOrder = await orderService.deleteOrder(req.params.id);
            if (deletedOrder) {
                res.json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

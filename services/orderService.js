// services/orderService.js
import { Order } from "./../models/ecommerce/order.models.js";

export const orderService = {
    createOrder: async (orderData) => {
        const order = new Order(orderData);
        return await order.save();
    },
    
    getAllOrders: async () => {
        return await Order.find().populate("customer", "username email").populate("orderItems.productId", "name price");
    },

    getOrderById: async (id) => {
        return await Order.findById(id).populate("customer", "username email").populate("orderItems.productId", "name price");
    },

    updateOrder: async (id, orderData) => {
        return await Order.findByIdAndUpdate(id, orderData, { new: true });
    },

    deleteOrder: async (id) => {
        return await Order.findByIdAndDelete(id);
    }
};

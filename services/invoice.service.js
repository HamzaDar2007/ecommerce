import { Invoice } from "../models/ecommerce/invoice.models.js";
import { Product } from "../models/ecommerce/product.models.js";

export const invoiceService = {
    createInvoice: async (userId, items) => {
        let totalAmount = 0;

        // Validate items and calculate total amount
        const invoiceItems = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error(`Product not found: ${item.product}`);
                }

                const price = product.price * item.quantity;
                totalAmount += price;

                return {
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price, // Unit price
                };
            })
        );

        // Create and save the invoice
        const invoice = new Invoice({
            user: userId,
            items: invoiceItems,
            totalAmount,
        });

        return await invoice.save();
    },

    getUserInvoices: async (userId) => {
        return await Invoice.find({ user: userId }).populate("items.product");
    },

    updateInvoiceStatus: async (invoiceId, status) => {
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            throw new Error("Invoice not found");
        }

        invoice.status = status;
        return await invoice.save();
    },
};

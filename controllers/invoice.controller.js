import { invoiceService } from "../services/invoice.service.js";

export const invoiceController = {
    createInvoice: async (req, res) => {
        try {
            const { items } = req.body;
            const invoice = await invoiceService.createInvoice(req.user.id, items);
            res.status(201).json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getUserInvoices: async (req, res) => {
        try {
            const invoices = await invoiceService.getUserInvoices(req.user.id);
            res.status(200).json(invoices);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateInvoiceStatus: async (req, res) => {
        try {
            const { invoiceId, status } = req.body;
            const updatedInvoice = await invoiceService.updateInvoiceStatus(invoiceId, status);
            res.status(200).json(updatedInvoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

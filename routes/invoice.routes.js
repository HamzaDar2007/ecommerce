import express from "express";
import { invoiceController } from "../controllers/invoice.controller.js";
import { authenticate } from "../middelware/jwt_middleware.js";

const router = express.Router();

router.post("/create", authenticate, invoiceController.createInvoice); // Create an invoice
router.get("/my-invoices", authenticate, invoiceController.getUserInvoices); // Get user's invoices
router.post("/update-status", authenticate, invoiceController.updateInvoiceStatus); // Update invoice status

export default router;

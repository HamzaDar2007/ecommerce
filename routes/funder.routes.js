import express from "express";
import { funderController } from "../controllers/funder.controller.js";
import { authenticateAdmin } from "../middelware/jwt_middleware.js";

const router = express.Router();

router.post("/", authenticateAdmin, funderController.addFunder); // Add a new funder
router.get("/", authenticateAdmin, funderController.getFunders); // Get all funders
router.get("/:id", authenticateAdmin, funderController.getFunderById); // Get a specific funder
router.post("/contribute", authenticateAdmin, funderController.recordContribution); // Record a contribution
router.put("/:id", authenticateAdmin, funderController.updateFunder); // Update funder details
router.delete("/:id", authenticateAdmin, funderController.deleteFunder); // Delete a funder

export default router;






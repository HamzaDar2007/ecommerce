import { funderService } from "../services/funder.service.js";

export const funderController = {
    // Add a new funder
    addFunder: async (req, res) => {
        try {
            const funder = await funderService.addFunder(req.body);
            res.status(201).json(funder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get all funders
    getFunders: async (req, res) => {
        try {
            const funders = await funderService.getFunders();
            res.status(200).json(funders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a specific funder by ID
    getFunderById: async (req, res) => {
        try {
            const funder = await funderService.getFunderById(req.params.id);
            res.status(200).json(funder);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    // Record a contribution
    recordContribution: async (req, res) => {
        try {
            const { funderId, amount, purpose } = req.body;
            const contributionData = { amount, purpose };
            const funder = await funderService.recordContribution(funderId, contributionData);
            res.status(200).json(funder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update funder details
    updateFunder: async (req, res) => {
        try {
            const funder = await funderService.updateFunder(req.params.id, req.body);
            res.status(200).json(funder);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    // Delete a funder
    deleteFunder: async (req, res) => {
        try {
            await funderService.deleteFunder(req.params.id);
            res.status(200).json({ message: "Funder deleted successfully" });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

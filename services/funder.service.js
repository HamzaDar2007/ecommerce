import { Funder } from "../models/ecommerce/funder.models.js";

export const funderService = {
    // Add a new funder
    addFunder: async (funderData) => {
        const funder = new Funder(funderData);
        return await funder.save();
    },

    // Get all funders
    getFunders: async () => {
        return await Funder.find();
    },

    // Get a specific funder by ID
    getFunderById: async (funderId) => {
        const funder = await Funder.findById(funderId);
        if (!funder) {
            throw new Error("Funder not found");
        }
        return funder;
    },

    // Record a contribution for a funder
    recordContribution: async (funderId, contributionData) => {
        const funder = await Funder.findById(funderId);
        if (!funder) {
            throw new Error("Funder not found");
        }

        // Add the contribution and update the totalContribution field
        funder.contributions.push(contributionData);
        funder.totalContribution += contributionData.amount;

        return await funder.save();
    },

    // Update funder details
    updateFunder: async (funderId, updateData) => {
        const funder = await Funder.findByIdAndUpdate(funderId, updateData, {
            new: true,
        });
        if (!funder) {
            throw new Error("Funder not found");
        }
        return funder;
    },

    // Delete a funder
    deleteFunder: async (funderId) => {
        const funder = await Funder.findByIdAndDelete(funderId);
        if (!funder) {
            throw new Error("Funder not found");
        }
        return funder;
    },
};

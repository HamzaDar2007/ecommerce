import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true, // Amount contributed
    },
    purpose: {
        type: String, // Reason for the contribution
    },
    date: {
        type: Date,
        default: Date.now, // Contribution date
    },
});

const funderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        totalContribution: {
            type: Number,
            default: 0, // Total contributed amount
        },
        contributions: [contributionSchema], // Array of contribution records
    },
    { timestamps: true }
);

export const Funder = mongoose.model("Funder", funderSchema);

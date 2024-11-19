import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "../models/ecommerce/user.models.js"; // Adjust the path to your user model

// Load environment variables
dotenv.config();

// Admin user details
const seedAdmin = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");

        // Check if an admin user already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists:", existingAdmin.email);
            return;
        }

        // Hash the admin password
        const hashedPassword = await bcrypt.hash("admin123", 10); // Replace with your preferred default password

        // Create the admin user
        const adminUser = new User({
            username: "admin",
            email: "admin@example.com", // Replace with your desired admin email
            password: hashedPassword,
            role: "admin",
        });

        await adminUser.save();
        console.log("Admin user created successfully");
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Run the seed function
seedAdmin();

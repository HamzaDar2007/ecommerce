import { User } from '../models/ecommerce/user.models.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userService = {
    registerCustomer: async ({ username, email, password }) => {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user with the role 'customer'
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "customer"
        });

        // Save the user to the database
        return await newUser.save();
    },

    login: async ({ email, password }) => {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET, // Ensure this is defined in your .env file
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Return user details and token
        return { user, token };
    }
};

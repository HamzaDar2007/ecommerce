import { User } from '../models/ecommerce/user.models.js';
import bcrypt from 'bcrypt'

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
    }
};

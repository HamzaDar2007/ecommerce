import { userService } from '../services/userService.js';

export const registerCustomer = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Call the service to register the customer
        const newUser = await userService.registerCustomer({ username, email, password });

        res.status(201).json({ message: "Customer registered successfully", user: newUser });
    } catch (error) {
        if (error.message === "Email already in use") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}


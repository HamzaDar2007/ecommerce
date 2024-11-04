import { User } from '../models/ecommerce/user.models.js';

export const userService = {
    register: async (data) => {
        const user = new User(data);
        return await user.save();
    },
    // Add more methods for login, update, etc.
};

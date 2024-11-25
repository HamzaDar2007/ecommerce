import jwt from 'jsonwebtoken';

// Middleware to authenticate all users
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        req.user = decoded; // Attach the decoded user to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to authenticate admin users only
export const authenticateAdmin = (req, res, next) => {
    authenticate(req, res, () => { // First, authenticate the user
        if (req.user.role !== "admin") { // Check if the user's role is 'admin'
            return res.status(403).json({ message: "Access denied, admin only" });
        }
        next(); // Proceed if the user is an admin
    });
};

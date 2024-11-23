import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("Decoded Token:", decoded); 
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (err) {
        console.error("JWT Error:", err.message)
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

import jwt from('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user info (id, role) to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
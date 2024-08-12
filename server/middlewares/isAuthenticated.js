import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
                success: false
            });
        }

        // Verify the token with the secret key
        const decoded = await jwt.verify(token, process.env.SECREAT_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        });
    }
};

export default isAuthenticated;

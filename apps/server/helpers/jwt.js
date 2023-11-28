import jwt from 'jsonwebtoken';

export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
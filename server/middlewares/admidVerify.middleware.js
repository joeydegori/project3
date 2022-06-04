// In routes, you can use this middleware after jwtVerify, without jwtVerify this middleware will not have access to req.user

const adminVerify = (req, res, next) => {
    if (req.user.role === 'admin') next();
    else
        res.status(404).json({ message: 'You are not allowed to access this' });
};

module.exports = { adminVerify };

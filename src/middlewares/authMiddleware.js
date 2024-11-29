// Make routes protected
// Auth middlware will intercept my request and check the token to see if the user is authentinticated
// If the user is authenticated, the user will be able to access the protected routes

const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token){
            return res
            .status(401)
            .json({ message: "Access Denied. No token provided" });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decoded user is: ", req.user);
            next();
        }
        catch(err){
            res.status(400).json({message: "Invalid token"});
        }
    }
    else {
        return res
        .status(401)
        .json({ message: "Access Denied. No token provided" });
    }
};

module.exports = verifyToken;

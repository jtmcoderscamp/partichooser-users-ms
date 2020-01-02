import jwt from "jsonwebtoken";

/**
 * This simple middleware checks the headers for authentication token and extracts it into a "user" property of the request;
 * If the token doesn't exist, user is set to null
 * If the token exists but isn't valid, error is thrown
 */
export default function extractAuthDetails(req, res, next){
    const token = req.headers["x-auth-token"];
    const jwtKey = process.env.JWT_SECRET;
    let user;

    if (token && typeof token === "string"){
        user = jwt.verify(token, jwtKey);
    }
    else user = null;

    req.user = user;

    next();
}
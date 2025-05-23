import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    // Find the user associated with the token and store it in user variable (excluding password)
    // here we are using select("-password") to exclude the password field from the user object
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.error("Error in protectRoutes middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
// This middleware checks for a JWT token in the request cookies, verifies it, and attaches the user to the request object if valid. If any step fails, it sends an appropriate error response.

//* here in this code we storing the jwt token in cookies so if we have to access the token we can directly access it from cookies, in server.js we have added one middleware to parse the cookies which is cookieParser.
//* if we have stored the token in local storage then we have to access it from local storage and then send it in the headers of the request and then we have to verify it in the middleware. for that we have to extract the bearer token from the headers and then verify it.
//? we would write like this
// const token = req.headers.authorization.split(" ")[1];
// if (!token) {
//   return res.status(401).json({ message: "Unauthorized, no token provided" });
// }
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// if (!decoded) {
//   return res.status(401).json({ message: "Unauthorized, invalid token" });
// }
// const user = await User.findById(decoded.id);
// if (!user) {
//   return res.status(401).json({ message: "Unauthorized, user not found" });
// }
// req.user = user; // Attach the user to the request object
// next();
// this is how we can access the token from local storage and then verify it in the middleware. but in this case we have to send the token in the headers of the request and then we have to verify it in the middleware. for that we have to extract the bearer token from the headers and then verify it.

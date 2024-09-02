 const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>", remove the "Bearer " prefix
  const jwtToken = token.replace("Bearer ", "").trim();
  try {
    // Verify the token
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Fetch user details from the database
    const userData = await User.findById(decodedToken.userId).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found" });
    }

    // Attach user data to the request object for use in subsequent middleware or route handlers
    req.user = userData;
    req.token = jwtToken; // Optionally attach the token to the request if needed
    req.userId = userData._id; // Optionally attach the user ID to the request if needed

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

module.exports = authMiddleware;
 
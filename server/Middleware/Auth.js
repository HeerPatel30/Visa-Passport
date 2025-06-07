import jwt from 'jsonwebtoken';
export default function auth(req, res, next) {
  const token = req.headers.token

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      status: 401,
    });
  }

  // Verify the token (assuming you have a function to do this)
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Failed to authenticate token",
        status: 403,
      });
    }
    
    // Save the decoded information for use in other routes
    req.user = decoded;
    next();
  });
}

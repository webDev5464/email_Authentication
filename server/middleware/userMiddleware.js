import jwt from "jsonwebtoken";

export const UserVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token, "userSecureKey");
    req.userId = verifyToken.userId;

    next();
  } catch (err) {
    res.status(201).send({
      process: false,
      message: err.message,
    });
  }
};

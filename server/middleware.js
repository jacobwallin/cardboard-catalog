const { validationResult } = require("express-validator");

// user must be logged in
const isUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// user must be logged in and have administrator privileges
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const validationErrorHandling = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 500;
    error.message = { validationErrors: errors.array() };
    next(error);
  }
};

module.exports = {
  isUser,
  isAdmin,
  validationErrorHandling,
};

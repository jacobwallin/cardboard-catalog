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

module.exports = {
  isUser,
  isAdmin,
};

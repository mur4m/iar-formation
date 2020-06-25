module.exports = (req, res, next) => {
  req.session.currentUser = {
    _id: "5ec3aaa1dda5ba14c2c72fe8",
    username: "demo-admin",
    role: "admin",
    email: "robert@admin.com",
  };
  next();
};

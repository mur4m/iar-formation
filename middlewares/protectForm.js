module.exports = function protectForm(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "admin") next(); 
    else res.redirect("/");
};
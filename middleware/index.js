


var middlewareObj = {}
 


//LOGIN MIDDLEWARE


middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in first");
    res.redirect("/login");
}

module.exports = middlewareObj;
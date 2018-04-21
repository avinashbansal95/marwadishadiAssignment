
var express      = require("express");
var router       = express.Router();
var  passport    = require("passport");
var User         = require("../models/user");
var middleware = require("../middleware");
router.get("/", function(req,res)
{
    res.render("landing");
});

router.get("/dashboard",middleware.isLoggedIn,function(req, res)
{
    res.render("dashboard");
})

// ======
//AUTH ROUTES
//========

router.get("/register",function(req, res)
{
    res.render("register")
});

//HANDLE SIGN UP ROUTE

router.post("/register",function(req, res)
{
    var newUser = new User({username: req.body.username,name:req.body.name});
    User.register(newUser, req.body.password,function(err, user)
    {
        if(err)
        {
            console.log(err);
            req.flash("error",err.message)
            return res.redirect("/register");
            
        }
        
         passport.authenticate("local")(req, res, function(){
             req.flash("success","successfully signed up as " + user.name);
           res.redirect("/dashboard");

    })
});
});

//show login form

router.get("/login",function(req, res)
{
    res.render("login");
});


//HANDLING LOGIN LOGICS
router.post("/login",passport.authenticate("local", 
{
    successRedirect:"/dashboard",
    failureRedirect:"/login"}),
    function(req, res)
{
    
});

//LOGOUT ROUTE

router.get("/logout",function(req, res)
{
    req.logout();
    req.flash("success","Logged out")
    res.redirect("/");
})

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
module.exports = router;
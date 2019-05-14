var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/:conversationId', function(req, res, next) {
//   res.render('index', { conversationId: req.params.conversationId });
// });


router.get('/' , (req, res, next) => {

    res.render('login')
})


router.get('/login' , (req, res, next) => {

    res.render('login')
})



router.get('/register' , (req, res, next) => {

    res.render('register')
})


router.get('/home' , (req, res, next) => {

    res.render('index')
})

router.get('/conv/:id' , (req,res, next) => {
    res.render('conv' , {"conv_id": req.params.id})
})


router.get('/create_conv' , (req, res, next) => {
    res.render('create_conv')
})


router.get('/get_users' , (req , res , next) => {
    res.render("users")
})


module.exports = router;

var express = require('express');
var router = express.Router();
var userService = require('./../services/users/usersManager')
var checkToken = require("./../middleware/checkToken")


router.post('/register' , function(req, res, next) {
    userService.createNewUser(req.body , (err, user) => {
        if(err) {
            res.status(400).json(err)
        }
        res.status(201).json(user)
    })
    
})


router.post('/login', (req, res, next) => {

    userService.login(req.body, (err, token) => {
      if (err) {
            res.status(400).json(err)
      }
      res.status(200).json(token)
    })

})

router.get('/profile/:userId?', checkToken.checkToken, (req, res, next) => {
    let userId = req.params.userId || req.userData.id
    userService.getProfile(userId , (err, profile) => {
        if(err) {
            res.status(400).json(err)
        }
        res.status(200).json(profile)
    })
})

router.patch('/profile/update' , checkToken.checkToken, (req,res,next) => {
    userService.updateProfile(req.userData.id, req.body , (err, newProfile) => {
        if(err) {
            res.status(400).json(err)
        }
        res.status(200).json(newProfile)
    })
})


router.get('/users', checkToken.checkToken, (req, res, next) => {
    userService.getAllUsers(req.app.get("redGetAsync"), (users) => {
        res.status(200).json(users)
    })
})

module.exports = router;

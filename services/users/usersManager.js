var userRepo = require('./repos/userRepository')
var passwordHash = require('password-hash');
var jwt = require('./helpers/jwt')


module.exports = {

    createNewUser : (data, callback) => {
        data.password = passwordHash.generate(data.password)
        userRepo.create(data , (err, user) => {
            if (err) {
                console.error(err)
            } else {
                user.dataValues.token = jwt.generateToken(user.toJSON())
            }
            callback(err,user)
        })
    },

    login : (data, callback) => {
        userRepo.findOneBy({email: data.email}, (err, user) => {
            if(err) {
                console.error(err)
                return
            }
            passwordCheck = passwordHash.verify(data.password, user.password)

            if (passwordCheck) {
                user.dataValues.token = jwt.generateToken(user.toJSON())
                callback(err, user)
            } else {
                callback({"error": "password is not correct"}, [])
            }
        })
    },

    getProfile: (userId, callback) => {
        userRepo.findOne(userId, (err, user) => {
            callback(err, user || [])
        })
    },

    updateProfile: (userId, data, callback) => {
        if(data.password) {
           data.password = passwordHash.generate(data.password)
        }
        userRepo.updateProfile(userId, data, (err, newProfile) => {
            if(err) {
                console.error(err)
            }
            callback(err, newProfile)
        })
    },

    getAllUsers: async (redCon , callback) => {

        try {
            let users = await userRepo.getAll()

            users.forEach(async (user) => {
                user.dataValues.status = await redCon(user.id) ? true : false
                if (user.id === users[users.length-1].id) {
                    callback(users)
                }
            })

               
        } catch (error) {
            console.log(error)
        }
    }


}
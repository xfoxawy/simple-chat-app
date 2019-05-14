var db = require('./../models')


const updateProfile = async (userId, data, callback) => {
    try {
        const user = await db.user.findOne({ where: { id: userId } });
        updatedUser = await user.update(data);
        callback(null, user)
    } catch (err) {
        callback(err, null)
    }
}

module.exports = {


    create: (data, callback) => {
        db.user.create(data)
            .then((user) => {
                callback(null, user)
            })
            .catch((err) => {
                callback(err, [])
            })
    },

    findOne: (userId, callback) => {
        db.user.findOne({ where: { id: userId } })
            .then((user) => {
                callback(null, user)
            })
            .catch((err) => {
                callback(err, [])
            })
    },

    findOneBy: (data, callback) => {
        db.user.findOne({ where: data })
            .then((user) => {
                callback(null, user)
            })
            .catch((err) => {
                callback(err, [])
            })
    },

    getAll: async () => {
        
        try {
            return await db.user.findAll({})
        } catch (error) {
            console.log(error)
            return error
        }
        
    },


    updateProfile

}





















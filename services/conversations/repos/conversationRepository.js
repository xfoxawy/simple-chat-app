var db = require('./../models')

module.exports = {

    create: (data, callback) => {

        db.conversation.create(data)
        .then((conversation) => {
            callback(null,conversation)
        })
        .catch((error) => {
            callback(error, [])
        })
    },

    findOne: async (conversationId) => {

        try {
            let conversation = await db.conversation.findOne({where: {id: conversationId}})
            return conversation
        } catch (error) {
            console.log(error)
        }
    }


}
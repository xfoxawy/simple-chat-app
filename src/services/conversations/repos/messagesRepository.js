var db = require('./../models')

module.exports = {

    getConversationMessages: async (conversationId) => {

        try {
            let obj = {
                conversation_id: conversationId
            }
            let messages = await db.message.findAndCountAll({where: obj})
    
            return messages
        } catch (error) {
            console.log(error)
        }
        
    },

    create: async (data) => {

        try {
            data.sender_id = data.userId

            let message = await db.message.create(data)

            return message
            
        } catch (error) {
            console.log(error)
        }
    }
    


}
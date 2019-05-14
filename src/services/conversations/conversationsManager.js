var conversationProvider = require('./providers/conversationProvider')
var messageProvider = require('./providers/messageProvider')
var userManager = require('../users/usersManager')


module.exports = {

    initiateConversation: (data, callback) => {

        conversationProvider.createNewOne(data, (err, conversation) => {

            if(err) { 
                console.error(err)
            }
            return callback(err, conversation)

        })

    },

    getConversation: async (data, callback) => {

        try {
            let conversation = await conversationProvider.checkUserCanGetConversation(data)

            if (!conversation) {
                callback({error: "user has not permission to get this conversation"}, [])
            }
            
            conversation.dataValues.messages = await conversationProvider.getConversationMessages(data.conversationId)
                   

            for (let i = 0; i < conversation.dataValues.messages.count; i++) {
                userManager.getProfile(conversation.dataValues.messages.rows[i].sender_id , async (err, user) => {
                   
                    conversation.dataValues.messages.rows[i].dataValues.sender_info = await user
            
                    if(i === conversation.dataValues.messages.count - 1) {
                        callback(null, conversation)
                    }
                })          
            }


        } catch (error) {
            console.log(error)

            callback(error, [])
        }

        
    },

    getAllConversations: async (userId, callback) => {

        try {
            let conversations = await conversationProvider.getAllConversations(userId)

            callback(null, conversations)
            
        } catch (error) {
            console.log(error)

            callback(error, []) 
        }
    },

    sendMessage : async (data, callback) => {

        try {
            let message = await messageProvider.createNewMessage(data)

            userManager.getProfile(message.sender_id , async (err, user) => {
                message.dataValues.sender_info = await user

                callback(null, message)

            })
            
            
        } catch (error) {
            console.log(error)

            callback(error, [])
        }
        
    }
}
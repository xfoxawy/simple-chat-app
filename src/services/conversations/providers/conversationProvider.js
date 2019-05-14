var conversationRepo = require("./../repos/conversationRepository")
var conversationUsersRepo = require("./../repos/conversationUsersReqpository")
var messagesRepo = require("./../repos/messagesRepository")

module.exports = {

    createNewOne: (data, callback) => {

        // param data contain 
        // initiaed_user int 
        // coversation_name string
        // group_users array of integers []int
        let conversationObj = {
            initiated_user: data.initiated_user,
            conversation_name: data.conversation_name
        }

        conversationRepo.create(conversationObj, (err, conversation) => {

            if (err) {
                callback(err,conversation)
            }
            if(typeof data.group_users === "string") {
                data.group_users = JSON.parse(data.group_users)
            }
            // add intitated user to the group
            data.group_users.push(data.initiated_user)
            conversationUsersRepo.create(data.group_users, conversation.id, async (joined_users) => {
                conversation.dataValues.users = joined_users
                callback(err,conversation)
            })

        })
    },

    checkUserCanGetConversation: async (data) => {
    
        let conversation = await conversationUsersRepo.checkUserCanGetConversation(data)
        if (conversation) {
            return conversation
        }
        return false
    },

    getConversationMessages: async (conversationId) => {

        try {

            let messages = await messagesRepo.getConversationMessages(conversationId)
            return messages

        } catch (error) {
            console.log(error)
        }
    },

    getAllConversations: async (userId) => {

        try {
            
            let conversations = await conversationUsersRepo.findByUserId(userId)

            for (let i = 0; i < conversations.length; i++) {
                conversations[i].dataValues.conversation_info = 
                    await conversationRepo.findOne(conversations[i].conversation_id)
            }
            return conversations


        } catch (error) {
            console.log(error)
        }
    }



}
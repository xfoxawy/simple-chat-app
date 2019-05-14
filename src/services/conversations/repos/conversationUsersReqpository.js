var db = require('./../models')

module.exports = {

    create: async (users, conversation_id, callback) => {

        let joined_users = []

        for (let i = 0; i < users.length; i++) {
            let obj = {
                user_id: users[i],
                conversation_id: conversation_id
            }

            await db.conversation_user.findOrCreate({where: obj})
            .then(([user_joined, created]) => {
                joined_users.push(user_joined.user_id)
            })
            .catch((err) => {
                callback(joined_users)
            })

        }
        callback(joined_users)
    },

    checkUserCanGetConversation: async (data) => {

        let obj = {
            user_id: data.userId,
            conversation_id: data.conversationId
        }
        return await db.conversation_user.findOne({where: obj})

    },

    findByUserId: async (userId) => {

        try {
            let obj = {
                user_id: userId
            }
            
            let conversations = await db.conversation_user.findAll({
                where: obj,
                attributes: ['conversation_id']
            })
    
            return conversations
        } catch (error) {
            console.log(error)
        }
        
    }

    


}
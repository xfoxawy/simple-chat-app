var messageRepo = require("./../repos/messagesRepository")

module.exports = {

    createNewMessage: async (data) => {
        try {
            let message = await messageRepo.create(data)
            return message
        } catch (error) {
            return error
        }
    }
}
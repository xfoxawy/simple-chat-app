var express = require('express');
var router = express.Router();
var conversations = require('./../services/conversations/conversationsManager');
var checkToken = require("./../middleware/checkToken")


router.post("/create" , checkToken.checkToken ,  (req, res, next) => {
    // inject users' id who sends request with body
    req.body.initiated_user = req.userData.id

    conversations.initiateConversation(req.body , (err, conversation) => {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(conversation)
    })

})

router.get("/:conversationId" , checkToken.checkToken, (req, res, next) => {

    let data = {
        conversationId: req.params.conversationId,
        userId: req.userData.id
    }

    conversations.getConversation(data, (err, conversation) => {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(conversation)
    })
})


router.get("/", checkToken.checkToken, (req, res, next) => {

    conversations.getAllConversations(req.userData.id, (err, conversations) => {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(conversations)
    })

})


router.post("/send_message", checkToken.checkToken, (req, res, next) => {

    req.body.userId = req.userData.id

    conversations.sendMessage(req.body , (err, message) => {
        if (err) {
            res.status(400).json(err)
        }
        req.app.get("io").emit(message.conversation_id, message)
        res.status(200).json(message)
    })
})


module.exports = router;

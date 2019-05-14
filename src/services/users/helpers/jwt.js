var jwt = require('jsonwebtoken');

module.exports = {

    generateToken: (payload) => {
        token = jwt.sign(payload, 'shhhhh')
        return {
            "type": "bearer",
            "access_token": token,
            "expire_at": -1
        }
    }

}
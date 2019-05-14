let jwt = require('jsonwebtoken');

module.exports = {

    checkToken : (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
      
        if (token) {
          jwt.verify(token, 'shhhhh', (err, decoded) => {
            if (err) {
              return res.status(401).json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.userData = decoded;
              updateUserStatus(req.userData.id, req.app.get("redCon"))              
              next();
            }
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
    }
}

function updateUserStatus(userId , redClient) {
  redClient.set(userId, true, 'EX' , 15)
}
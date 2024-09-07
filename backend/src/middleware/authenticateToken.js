const db = require('../models');
const User = db.userModel;

function authenticateToken(req, res, next) {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ error: true, message: 'No authorisation token available' });
    }
  
    /* jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: true, message: 'Token verification failed' });
        }
        req.user = decoded; // Store decoded user information in the request object
        next();
    }); */

    User.findOne({
        where: {
            u_token: token
        }, attributes: {  }
    })
    .then(user => {
        if (user) {
            next();
        } else {
            res.status(403).json({error: true, message: "Authorisation token invalid"});
        }
    })
    .catch(error => {
        res.status(500).send({
            error: true,
            message: error.message || "Some error occurred while retrieving the information"
        });
    });

    
}
  
module.exports = authenticateToken;
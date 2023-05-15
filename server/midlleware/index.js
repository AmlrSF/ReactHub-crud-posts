const jwt = require('jsonwebtoken');
module.exports = authorize = async (req,res,next)=>{
    let {Grabtoken} = req.body;
    if(!Grabtoken) return res.status(400).send({
        "errors": [
                {
                    "type": "token",
                    "value":'no access token',
                    "msg": "invalid token",
                }
        ]
    })
    try {
        const user = await jwt.verify(Grabtoken.slice(1,Grabtoken.length-1),process.env.SECRET_CODE);
        req.body.email = user.email;
        next();
    } catch (error) {
        console.log(error);;    
    }
    
}
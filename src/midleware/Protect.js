const jwt = require('jsonwebtoken');
require('dotenv').config()

const Protect = async (req,res,next) => {
    try{

    let {authorization} = req.headers
    console.log('headers')
    let bearer = authorization.split(" ")
    console.log(bearer)

    let decoded = await jwt.verify(bearer[1],process.env.JWT_TOKEN);
    console.log('decoded') 
    console.log(decoded)   
    req.payload = decoded  
    next()
    } catch(err){
        return res.status(404).json({"status":404,"message":"token wrong",err})
    }

}

module.exports = {Protect}
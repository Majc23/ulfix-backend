const jwt = require('jsonwebtoken');
const config = require('../utils/config')
const userModel = require('../model/users');


const login = async (request, response, next) => {
        const user = await userModel.findOne({email: request.body.email});
        if(!user){
            return next(new Error('401'));
        }
        if(!user.comparepassword(request.body.password)){
            return next(new Error('401'));
        }
       
        const accessToken = jwt.sign(JSON.stringify({
            name:user.name,
            emai:user.email,
            _id: user._id
            }), config.secret);
        response.send({accessToken, name:user.name,emai:user.email,_id: user._id})
}

module.exports = {login}
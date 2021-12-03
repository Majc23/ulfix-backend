
const userModel = require('../model/users');

const createUser = async (request,response, next) =>{
    console.log(request.body);
    const { email} = request.body;
    const isUserExist = await userModel.findOne({
        email,
    });
    if(isUserExist){
        return next(new Error('409')); 
    }
    const user = new userModel(request.body);
    user.save();

    response.send(user);
}

const getUser = async( request, response, next) =>{
    if(!request.user || request.user.id != request.params.id){
        return next(new Error('403'));
    }
    const user = await userModel.findById(request.params.userId).select('-password');
    if(!user){
        return next(new Error('404'));
    }
    response.send(user);
}

const getUsers = async( request, response, next) =>{
    console.log(request.user);
    if(!request.user ){
        return next(new Error('403'));
    }
    const users = await userModel.find().limit(20).skip(+request.params.page*20).select('-password');
    const totalUsers = await userModel.count();
    response.send({users, totalUsers});
}

const upDateUser = async ( request, response, next) =>{
    if(!request.user || request.user.id != request.params.id){
        return next(new Error('403'));
    }
    const user = await userModel.findById(request.params.userId);
    if(!user){
        return next(new Error('404'));
    }
    if(request.body.name){
        user.name = request.body.name;
    }
    if(request.body.email){
        user.email = request.body.email;
    }
    if(request.body.password){
        user.password = request.body.password;
        
    }
    user.save();
    response.send(user);
}

const deleteUser = async ( request, response, next) =>{
    if(!request.user || request.user.id != request.params.id){
        return next(new Error('403'));
    }
    await userModel.deleteOne({_id:request.params.id})
    response.send();
}

module.exports = {createUser, getUser, getUsers, upDateUser, deleteUser}


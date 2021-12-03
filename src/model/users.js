const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
},
{
    timestamps:true,
}
)

schema.pre('save', async function(next){
    if (!this.isModified('password')) {return next();}
    try {
        let incrypte = await bcrypt.hashSync(this.password, 10);
        this.password = incrypte;

       return next();
    } catch (error) {
        return next();
    }
})

schema.methods.comparepassword = async function(password){
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {

        return false;
    }
    
}

const User = mongoose.model('User', schema);

module.exports = User;
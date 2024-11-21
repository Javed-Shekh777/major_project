const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : {type : String , trim : true},
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    password : {type :String , trim : true},
    profilePic : String,
    role : String,
    verified:{type:Boolean, default:false}
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel
const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser = req.userId

        

        const {  email, name,} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
           
        }

        const user = await userModel.findById(sessionUser)

        



        const updateUser = await userModel.findByIdAndUpdate(sessionUser,payload,{ returnOriginal: false,})

        updateUser.password = undefined;
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUser
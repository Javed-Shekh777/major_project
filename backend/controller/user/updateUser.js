const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser = req.userId
        const user = await userModel.findById(sessionUser);

        if(!user){
            res.json({
                data : null,
                message : "Unauthorized request",
                success : false,
                error : true
            })
        }

        

        const {  email, name,} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
           
        }

        const updateUser = await userModel.findByIdAndUpdate(sessionUser,payload,{ returnOriginal: false,})

        updateUser.password = undefined;
        res.json({
            data : updateUser,
            message : "User Updated successfully.",
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
const userModel = require("../../models/userModel");
const uploadProductPermission = require("../../helpers/permission");

async function changeUserRole(req,res){
    try{
       

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const sessionUser = req.userId;
        

        const { email, role,userID} = req.body

        const payload = {
            ...( email && { email : email}),
            
            ...( role && { role : role}),
        }


        const changeRole = await userModel.findOneAndUpdate({
            $or : [{_id : userID, email : email}],
        },payload,{new:true}).select("-password");

        
        res.json({
            data : changeRole,
            message : "User Role Changed",
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


module.exports = changeUserRole
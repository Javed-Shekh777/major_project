const userModel = require("../../models/userModel")

async function allUsers(req,res){
    try{
        

        let allUsers = await userModel.find();
        allUsers.map(e=>{
              e.password = undefined
        });
        
        res.json({
            message : "All User ",
            data : allUsers,
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

module.exports = allUsers
const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission");

const deleteProductController = async(req,res)=>{

    try{
        
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id} = req.body;
        const deletedProduct = await productModel.findByIdAndDelete(_id)

        if(!deletedProduct){
            return res.json({
                message : "Product not deleted Deleted or not!!",
                success : true,
                error : false,
                data : deletedProduct
            });
        }

        return res.json({
            message : "Product Deleted Successfully!!",
            success : true,
            error : false,
            data : deletedProduct
        })

    }catch(err){
       
       return  res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = deleteProductController
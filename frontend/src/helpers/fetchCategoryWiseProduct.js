import { toast } from "react-toastify";

const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi?.categoryWiseProduct?.url,{
        method : SummaryApi?.categoryWiseProduct?.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category || ""
        })
    });

    if (!response.ok) {
        toast("Data not fetched");
    }


    const dataResponse = await response.json();

    
 

    return dataResponse
}

export default fetchCategoryWiseProduct
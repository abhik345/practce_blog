import {createCategory, getCategory,updateCategoryById,deleteCategoryById} from "./category.service.js";

const createCategoryController = async (req,res) => {
    const {category_name,category_status} = req.body;
    if(!category_name){
        return res.status(404).json({
            status : 404,
            message : "Please enter category name"
        })
    }
    try {
        const data = {
            category_name ,
            category_status
        }
        const created = await createCategory(data);
        if(!created){

            return  res.status(402).json({
                status: 402,
                message : "Not Created"
            })
        }
     return  res.status(200).json({
            status : 200,
            message : "Category Created Successfully"
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message : e.message
        })
    }
};

const getCategoryController = async (req,res) => {
try{
    const categoryData = await getCategory();
    if(categoryData){
        return res.status(200).json({
            status : 200,
            message : "Category Data Found",
            data : categoryData
        })
    } else {
        return  res.status(res.statusCode).json({
            status : res.statusCode,
            message : "Not Found"
        })
    }

}catch (e) {
return res.status(res.statusCode).json({
    status : res.statusCode,
    message : e.message
})
}
};


const updateCategoryByIdController = async (req,res) => {
    const {category_id} = req.params
const {category_name,category_status} = req.body;
try{
    const data = {
        category_name,
        category_status
    }
    const updatedUser = await updateCategoryById(category_id,data);
    if(updatedUser){
        return  res.status(200).json({
            status : 200,
            message : "category Updated Successfully"
        })
    }
} catch (e) {
    return res.status(500).json({
        status : 500,
        message : e.message
    })
}
};


const deleteCategoryByIdController = async (req,res) => {
    const {category_id} = req.params;
    try{
        const deleted = await deleteCategoryById(category_id);
        if(deleted){
            return res.status(200).json({
                status : 200,
                message : "category deleted successfully"
            })
        }
        return  res.status(404).json({
            status : 404,
            message : "Category not found"
        })
    }catch (e) {
        return res.status(500).json({
            status : 500,
            message : e.message
        })
    }

}



export {
    createCategoryController,
    getCategoryController,
    updateCategoryByIdController,
    deleteCategoryByIdController

}
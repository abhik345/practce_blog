import {pool} from "../../../database/database.js";

const createCategory = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO category (category_name,category_status) VALUES (?,?)",
            [data.category_name,data.category_status],
            (error,result)  => {
                if(error) {
                    return reject(error);
                }
                resolve(result);
            }
        )
    })
};
const getCategory = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM category",
            [],
            (error,results) => {
                if(error){
                    return reject(error);
                }
                resolve(results);
            }
        )
    })
};

const updateCategoryById = (category_id,data) => {
    return new Promise((resolve,reject) => {
        const fields = [
            "category_name",
            "category_status"
        ]

        const updateFields = fields.filter((field) => data[field] !== undefined).map((field) => `${field} = ?`).join(", ");
        const updateValues = fields.filter((field) => data[field] !== undefined).map((field) => data[field]);
        updateValues.push(category_id);

        const sql = `UPDATE category SET ${updateFields} WHERE category_id = ?`;
        pool.query(
            sql,updateValues,
            (error,results) => {
                if(error){
                    return reject(error)
                }
                resolve(results || null)
            }
        )
    })
};

const deleteCategoryById = (category_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM category WHERE category_id  =?",
            [category_id],
            (error,results) => {
                if(error){
                    return reject(error);
                }
                resolve(results || null);
            }
        )
    })
}



export {
    createCategory,
    getCategory,
    updateCategoryById,
    deleteCategoryById
}
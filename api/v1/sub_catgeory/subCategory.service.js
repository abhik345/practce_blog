import {pool} from "../../../database/database.js";

const createSubcategory = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO subcategory (subacategory_name,category_id) VALUES (?,?)",
            [data.subacategory_name,data.category_id],
            (error,results) => {
                if(error){
                    return reject(error)
                }
                resolve(results);
            }
        )
    })
}



export {
    createSubcategory
}
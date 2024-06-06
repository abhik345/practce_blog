import {pool} from "../../../database/database.js";

const createBlog = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO blogs blog_name, blog_description,blog_category,blog_subCategory"
        )
    })
}
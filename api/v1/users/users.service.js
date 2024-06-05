import {pool} from "../../../database/database.js";

const createUser = (data,callback) => {
    pool.query(
        "INSERT INTO users (user_name,user_email,user_password) VALUES (?,?,?)",
        [data.user_name,data.user_email,data.user_password],
        (error,results,fields) => {
            if(error){
                return callback(error);
            } else {
                return callback(null,results);
            }
        }
    )
};

const getUsers = (callback) => {
    pool.query(
        "SELECT * FROM users",
        [],
        (error,results,fields) => {
            if(error){
                return callback(error)
            }
            return callback(null,results);
        }
    )
};

const getUserById = (user_id,callback) => {
    pool.query(
        `SELECT * FROM users WHERE user_id = ?`,
        [user_id],
        (error,results,fields) => {
            if(error){
                return callback(error)
            }
            return callback(null,results[0])
        }
    )
};

const getUserByEmail = (user_email,callback) => {
    pool.query(
        `SELECT * FROM users WHERE user_email= ?`,
        [user_email],
        (error,results,fields) =>{
            if(error){
                return callback(error)
            }
            return callback(null,results[0])
        }
    )
}



export {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail
}
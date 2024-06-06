import { pool } from "../../../database/database.js";

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
            [data.user_name, data.user_email, data.user_password],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM users",
            [],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

const getUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM users WHERE user_id = ?",
            [user_id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0] || null);
            }
        );
    });
};

const getUserByEmail = (user_email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM users WHERE user_email = ?",
            [user_email],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0] || null);
            }
        );
    });
};

const updateUserById  = (user_id,data) => {
    return new Promise((resolve, reject) => {
        const fields = [
            "user_name",
            "user_email"
        ]
        const updateFields = fields.filter((field) => data[field] !== undefined).map((field) => `${field} = ?`).join(", ")
        const updateValues = fields.filter((field) => data[field] !== undefined).map((field) => data[field]);
        updateValues.push(user_id);

        const sql = `UPDATE users SET ${updateFields} WHERE user_id = ?`
        pool.query(
            sql,
            updateValues,
            (error,results) => {
                if(error){
                    return reject(error);
                }
                resolve(results || null)
            }
        )
    })
};


export {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById
};

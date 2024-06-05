import { createUser,getUsers,getUserById,getUserByEmail} from "./users.service.js";
import {genSaltSync, hashSync} from "bcrypt";

const createUserController = async (req, res) => {
    const { user_email, user_name, user_password } = req.body;
    try {
        if (!user_email) {
            return res.status(400).json({
                status: 400,
                message: "User email is required"
            });
        }
        const existingUser = await getUserByEmail(user_email);
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: "User already exists. Try another email."
            });
        }
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(user_password, salt);
        const userData = {
            user_name: user_name,
            user_email: user_email,
            user_password: hashedPassword
        };
        await createUser(userData);
        return res.status(200).json({
            status: 200,
            message: "User created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};


const getUsersController = async (req,res) => {
    getUsers((error,results) => {
        if(error){
            return res.status(res.statusCode).json({
                status : res.statusCode,
                message : error
            })
        }
        return res.status(200).json({
            status : 200,
            message : "Users Found",
            data : results
        })
    })
};

const getUserByIdController = async (req,res) => {
    const {user_id} = req.params;
    getUserById(user_id,(error,results) => {
        if(error){
            return res.status(res.statusCode).json({
                status : res.statusCode,
                message : error
            })
        }
        const {user_password,...user} = results;
        return res.status(res.statusCode).json({
            status : res.statusCode,
            message : "Specific User Found",
            data : user
        })
    })
};

const getUserByEmailController = async(req,res) => {
    const {user_email}= req.body;
    getUserByEmail(user_email,(error,results) => {
        if(error){
            return res.status(res.statusCode).json({
                status : res.statusCode,
                data : error
            })
        }
        const {user_password,...user}= results
        return res.status(res.statusCode).json({
            status: res.statusCode,
            message : "user Found",
            data : user
        })
    })
};

export {
    createUserController,
    getUsersController,
    getUserByIdController,
    getUserByEmailController
}
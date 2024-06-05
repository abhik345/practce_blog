import { createUser,getUsers,getUserById,getUserByEmail} from "./users.service.js";
import {genSaltSync, hashSync} from "bcrypt";

const createUserController = async (req,res) => {



    const { user_email,user_name,user_password} = req.body;

    if(user_email){
      await  getUserByEmail(user_email,(error,results) => {
            if(error){
                return error;
            }
            const {user_email: email} = results;
            if(email === user_email){
               return  res.status(409).json({
                    status : 409,
                    message : "User Already exists Try Another email"
                })
            }

        })
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user_password,salt);
    const userData = {
        user_name : user_name,
        user_email : user_email,
        user_password : hashedPassword
    }

    createUser(userData, async (error,result) => {
        if(error){
            return res.status(500).json(error)
        }
        return  res.status(200).json({
            status: 200,
            message : "User Created successfully"
        })
    })
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
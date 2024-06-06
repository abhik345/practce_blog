import {createUser, getUsers, getUserById, getUserByEmail, updateUserById} from "./users.service.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

const {sign} = pkg

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

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user_password, salt);

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

const getUsersController = async (req, res) => {
    try {
        const results = await getUsers();
        return res.status(200).json({
            status: 200,
            message: "Users Found",
            data: results
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getUserByIdController = async (req, res) => {
    const { user_id } = req.params;
    try {
        const results = await getUserById(user_id);
        if (!results) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const { user_password, ...user } = results;
        return res.status(200).json({
            status: 200,
            message: "Specific User Found",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getUserByEmailController = async (req, res) => {
    const { user_email } = req.body;
    try {
        const results = await getUserByEmail(user_email);
        if (!results) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const { user_password, ...user } = results;
        return res.status(200).json({
            status: 200,
            message: "User Found",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateUserByIdController = async (req,res) => {
    try {
        const {user_id} = req.params
        const {user_name,user_email} = req.body;
        const userData = {
            user_name,user_email
        }
        await updateUserById(user_id,userData);
      return res.status(res.statusCode).json({
            status : res.statusCode,
            message : "User Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }

};

const loginController = async (req, res) => {
    const { user_email, user_password } = req.body;

    const comparePasswords = async (password, hashedPassword) => {
        return await bcrypt.compareSync(password, hashedPassword);
    };

    const generateToken = (userData) => {
        return sign({ result: userData }, "qwerty123", { expiresIn: "365d" });
    };
    try {
        const existingUser = await getUserByEmail(user_email);

        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const {user_password : hashedpassword,...user} = existingUser
        const isPasswordMatch = comparePasswords(user_password,hashedpassword);
        if(isPasswordMatch){
            const token = generateToken(existingUser);
            res.cookie('auth_token',token,{
                httpOnly : true,
                secure: true,
                maxAge : 365 * 24 * 60 * 1000
            })
            return res.status(200).json({
                status: 200,
                message: "Login Successfully",
                data: {
                    user: user
                }
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: "Invalid password"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    createUserController,
    getUsersController,
    getUserByIdController,
    getUserByEmailController,
    updateUserByIdController,
    loginController
};

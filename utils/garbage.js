import { getUserByEmail } from "./users.service.js";
import { compare } from "bcrypt";
import pkg from "jsonwebtoken";

const { sign } = pkg;

const loginController = async (req, res) => {
    const { user_email, user_password } = req.body;

    const comparePasswords = async (password, hashedPassword) => {
        return await compare(password, hashedPassword);
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

        const { user_password: hashedpassword, ...user } = existingUser;
        const isPasswordMatch = await comparePasswords(user_password, hashedpassword);

        if (isPasswordMatch) {
            const token = generateToken(user);
            // Save the token in a cookie
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Set to true in production
                maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
            });

            return res.status(200).json({
                status: 200,
                message: "Login Successfully",
                data: user
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

export { loginController };

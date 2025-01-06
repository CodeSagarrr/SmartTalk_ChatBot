import userModel from "../Models/Users.js"
import { hash, compare } from 'bcrypt'
import JWT from "jsonwebtoken";


// Api get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users) {
            res.status(200).json({ msg: "Success", Users: users })
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: "Error Occured", error: error.message })
    }
}

// Api for create User
export const userSignup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    const salt = 8;
    const hashPassword = await hash(password, salt)
    try {
        const user = await userModel.create({
            firstname,
            lastname,
            email,
            password: hashPassword
        })
        return res.status(200).json({ msg: "OK", userName:user.firstname , email:user.email })
    } catch (error) {
        console.log(error)
        res.json({ msg: "Error Occured", error: error.message })
    }
}

// Api for Login User
export const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        const userId = user._id.toString(); 
        if (!user) {
            return res.status(404).json({ msg: "User not exist" })
        } else {
            const isMatch = await compare(password, user.password)
            if (isMatch) {
                const Token = JWT.sign({userId, email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '15days' })
                res.cookie('JWT' , Token , {expiresIn : '15days'})
                res.status(200).json({ msg: "OK", userId: user._id ,userName:user.firstname , email:user.email })  
            } else {
                return res.status(400).json({ msg: "Incorrect Password" })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({ msg: "Error Occured", error: error.message })
    }
}

// Api for Logout User

export const userLogout = async(req , res) =>{
    const token = req.cookies.JWT;

    if(token) {
        res.clearCookie('JWT');
        return res.status(200).json({ msg: "success" });
    }
}
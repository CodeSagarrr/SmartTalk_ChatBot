import JWT from "jsonwebtoken";
import userModel from "../Models/Users.js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export const getChatComplition = async (req, res) => {
    const { content } = req.body;
    const userToken = req.cookies.JWT;
    if (!userToken) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    try {
        const decoded = JWT.verify(userToken, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not authenticated" });
        }
        // Generate a response using OpenAI

        const result = await model.generateContent(content);
        const aiResponse = result.response.text()
        // // Save the user message and AI response to the database
        const userChat = { role: 'user', content: content };
        const aiChat = { role: 'assistant', content: aiResponse };

        user.chats.push(userChat, aiChat);
        await user.save();

        // Send the AI response back to the frontend
        res.status(200).json(aiChat);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error getting chat", error: error });
    }
}


export const getAllChat = async (req, res) => {
    const userToken = req.cookies.JWT;
    if (!userToken) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    try {
        const decoded = JWT.verify(userToken, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded?.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not authenticated" });
        } else {
            res.status(200).json({ msg: "Success", userChat: user.chats });
        }
    } catch (error) {
        console.log(error || "Error Occured")
    }
}

export const deleteChat = async (req, res) => {
    const userToken = req.cookies.JWT;
    if (!userToken) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    try {
        const decoded = JWT.verify(userToken, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded?.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not authenticated" });
        } 
        // Clear user chats and save the changes to the database
        user.chats = [];
        await user.save();
        res.status(200).json({ msg: "success"});
    } catch (error) {
        console.log(error || "Error Occured")
    }
}
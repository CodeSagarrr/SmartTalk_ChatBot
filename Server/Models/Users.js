import { Schema, model } from "mongoose";


const chatSchema = new Schema({
    role:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
}, { timestamps: true })


const userModel = new model("userModel" , userSchema)

export default userModel
import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { MongoConnect } from './DB/Mongoose.js'

// Import routes
import { getAllUsers , userSignup , userLogin, userLogout } from "./Controllers/userController.js";
import { validateMiddleware , validateRegister , validateLogin  } from './Middleware/validations.js'
import { deleteChat, getAllChat, getChatComplition } from "./Controllers/chatController.js";
import cookieParser from "cookie-parser";
import { validateToken } from "./Middleware/tokenValidation.js";

// Express Configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser())
app.use(morgan("dev"));
dotenv.config();
// Connect to MongoDB
MongoConnect( process.env.MongoDB_URL )


// Routes
app.route("/api/user/users").get(getAllUsers);
app.route("/api/user/signup").post(validateMiddleware(validateRegister),userSignup);
app.route("/api/user/login").post(validateMiddleware(validateLogin),userLogin);
app.route("/api/user/logout").get(userLogout);
app.route("/api/user/new").post(validateToken , getChatComplition);
app.route("/api/user/allchat").get(validateToken , getAllChat);
app.route("/api/user/deleteChat").delete(validateToken , deleteChat);
app.get("/api/user/verify",validateToken , (req,res) =>{
    res.json({ user : req.user,  msg: "Success" })
})



const Port =  process.env.PORT || 8000 ;
app.listen(Port , () => {
    console.log(`Server Listening on http://localhost:${Port}`)
});
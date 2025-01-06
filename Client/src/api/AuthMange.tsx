import axios from 'axios'
import toast from 'react-hot-toast'

export const signupUser = async(firstname:string , lastname:string , email:string , password:string) =>{
    try {
        const res = await axios.post("/api/user/signup", { firstname , lastname , email , password})
        if(res.data.msg !== "OK") {
            toast.error(res.data.msg)
        }else{
            toast.success("Signup Successfully")
            return res.data
        }
    } catch (error:any) {
        console.log(error || "Error Occured")
    }
}

// Login
export const loginUser = async( email:string , password:string) =>{
    try {
        const res = await axios.post("/api/user/login", {  email , password})
        if(res.data.msg !== "OK") {
            toast.error(res.data.msg)
        }else{
            toast.success("Login Successfully")
            
            return res.data
        }
    } catch (error:any) {
        console.log(error || "Error Occured")
    }
}

export const userLogout = async() =>{
    try {
        const res = await axios.get("/api/user/logout")
        if(res){
            toast.success("Logout Successfully")
            return res.data
        }
    } catch (error) {
        console.log(error || "Error Occured")
    }
}

// Chat Api
export const getChatResponse = async(message : any) =>{
    try {
        const res = await axios.post("/api/user/new" , { content : message });
        if(res.status !== 200){
            throw new Error("Error Occured")
        }else{
            return res.data;
        }
    } catch (error) {
        console.log(error || "Error Occured")
    }
}

// getAllUserChat Api

export const getAllChat = async() =>{
    try {
        const res = await axios.get("/api/user/allchat")
        if(res.status !==200){
            throw new Error("Error Occured")
        }
        return res.data;
    } catch (error) {
        console.log("Error Occured" , error)
    }
}

export const deleteChats = async() =>{
    try {
        const res = await axios.delete("/api/user/deleteChat")
        if(res.status!==200){
            throw new Error("Error Occured")
        }
    } catch (error) {
        console.log( error || "Error Occured")
    }
}
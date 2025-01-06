import { object , string  } from 'zod'


export const validateMiddleware = (obj) => async(req , res , next) =>{
    try {
        const bodyParse = await obj.parseAsync(req.body) 
        req.body = bodyParse;
        next()
    } catch (err) {
        const errMsg = err.errors[0].message;
        res.json({msg:errMsg});
    }
}

// Zod validations
export const validateRegister = object({
    firstname : string({required_error: " Firstname is required"})
    .trim()
    .min(2, "First name should be at least 2 characters long")
    .max(50, "First name should not exceed 50 characters"),

    lastname : string({required_error: "Lastename is required"})
    .trim()
    .min(2, "Lastname should be at least 2 characters long")
    .max(50, "Lastname should not exceed 50 characters"),
    
    email: string({required_error: "Email is required" })
    .email("This email is not valid")
    .trim()
    .min(1 , "Email should be at least 1 character long"),

    password: string({required_error: "Password is required"})
    .trim()
    .min(4, "Password should be at least 4 character long ")
    .max(50, "Password should not exceed 50 characters"),
})


export const validateLogin = object({
    email: string({required_error: "Email is required" })
    .email("This email is not valid")
    .trim()
    .min(1 , "Email should be at least 1 character long"),

    password: string({required_error: "Password is required"})
    .trim()
    .min(4, "Password should be at least 4 character long ")
    .max(50, "Password should not exceed 50 characters"),
})

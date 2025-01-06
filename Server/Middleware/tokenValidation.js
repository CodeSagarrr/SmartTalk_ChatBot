import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
    const chekToken = req.cookies.JWT;
    if (!chekToken) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    const user = jwt.verify(chekToken, process.env.JWT_SECRET_KEY)
    if(!user){
        return res.status(401).json({ msg: "Token is not valid" });
    }else{
        req.user = user;
        next();
    }
}
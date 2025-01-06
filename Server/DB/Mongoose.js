import { connect } from "mongoose"


export const MongoConnect = (url) => {
    connect(url)
    .then(()=> console.log('MongoDB Connect'))
    .catch((err) => console.error("Error Ocuured in DB" , err))
}
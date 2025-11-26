import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date, //https://www.mongodb.com/docs/manual/reference/method/Date/
        required:true
    },
    location:{
        type:String
    },
    notifMessage:{
        type:String
    },
    notifTime:{
        type:Date
    },

    tags:{
        type:[String]
    }
    //research how to store images and other file types for the forms
    //TODO: create event controller, route
})

export default mongoose.model("Events", eventSchema)
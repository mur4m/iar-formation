const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const msgSchema = new Schema ({  
    name: String,  
    email: String,  
    message: String,
    }); 


const msgModel = mongoose.model("Msg", msgSchema);

module.exports = msgModel; 
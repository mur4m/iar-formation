const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const formationSchema = new Schema ({  
    title: String,
    minidescription: String,  
    description: String,  
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    }, 
    category: ["développement personel", "développement professionnel", "enfants"],   
    }) 


const formationModel = mongoose.model("Formation", formationSchema);

module.exports = formationModel; 


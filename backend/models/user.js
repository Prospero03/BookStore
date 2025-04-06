const mongoose = require("mongoose");
require("./book");

const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        
    },
    address:{
        type: String,
        required: true,
       
    },

    avatar: {
        type: String,
        default:"https://mysafezonemalaysia.com/wp-content/uploads/2024/09/SAFEZONE-THINGS.png",
        
    },

    role:{
        type:String,
        default:"user",
        enum:[ "user", "admin"]
    },

    favorites:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        }
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        }
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        }
    ],
},
{timestamps: true},
);

module.exports = mongoose.model("user", user)
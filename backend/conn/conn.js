const mongoose = require("mongoose");
require("dotenv").config();

const conn = async() =>{
    try {
        await mongoose.connect(`${process.env.URL}`);
        console.log("База Данных Mongo подключена")
    } catch (error) {
        console.log(error)
    }
}

conn();
 
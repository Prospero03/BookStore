const express = require("express");
const app = express();
//Подключение frontend - cors
const cors = require("cors")

require("dotenv").config();
require("./conn/conn")



const Books = require("./routes/book");
const User = require("./routes/user");
const Favorite = require("./routes/favorite");
const Cart = require("./routes/cart")
const Order =require("./routes/order")


//Подключение frontend - cors
app.use(cors());
//обработки JSON ОБЯЗАТЕЛЬНА
app.use(express.json());

app.use("/api/v1", Favorite);
app.use("/api/v1",Cart)
app.use("/api/v1", Books);
app.use("/api/v1", User);
app.use("/api/v1", Order);




app.listen(process.env.PORT, ()=>{
    console.log(`Сервер успешно запущен на порту ${process.env.PORT}`)
})


//Для MongoDB
//db.users.findOne({ _id: ObjectId("67ed6b8ead3a486ba42df094") });
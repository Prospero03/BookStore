const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const Order = require("../models/order");
const authenticateToken = require("./userAuth");

router.post ("/place-order", authenticateToken, async(req,res) =>{
    try {

        const {id} = req.headers;
        const {order} = req.body;

        for (const orderData of order){
            const newOrder = new Order({ user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDb._id},
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id},
            });

            return res.json({
                status: "Успешно",
                message: "Заказ успешно размещен"
            })


        }
    } catch (error) {
        return res.status(500).json({error:"Ошибка сервера"})
    }
})

router.get("/get-order-history", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        })

        const orderData = userData.orders.reverse();
        return res.json({
            status:"Успешно",
            data: orderData,
        })
    } catch (error) {
        return res.status(500).json({error:"Ошибка сервера"})
    }
})

router.get("/get-all-orders", authenticateToken, async(req,res)=>{
    try {
        const userData = await Order.find()

        .populate({
            path: "book",
        })

        .populate({
            path: "user"
        })

        .sort({ createdAt: -1});

        return res.json({
            status: "Успешно",
            data: userData,
        })

    } catch (error) {
        return res.status(500).json({error:"Ошибка сервера"})
    }
})

router.put("/update-status/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status: "Успешно",
            message: "Успешно отредактирован"
        });
    } catch (error) {
        return res.status(500).json({error:"Ошибка сервера"})
    }
})
module.exports = router;
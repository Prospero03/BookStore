const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

router.put("/add-to-cart", authenticateToken, async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookCart = userData.cart.includes(bookid);

        if(isBookCart){
            return res.json({
                status:"Успешно",
                message:"Книга уже добавлена в корзину"
            });
        };

        await User.findByIdAndUpdate(id,{
            $push: {cart: bookid},
        });

        return res.json({
            status:"Успешно",
            message:"Книга добавлена в корзину"
        })

    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.put("/remove-from-cart/:bookid", authenticateToken,async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;

        await User.findByIdAndUpdate(id,{
            $pull: {cart: bookid},
        })

        return res.json({
            status:"Успешно",
            message:"Книга удалена из корзины"
        })

    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.get("/get-user-cart", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;

        const userData = await User.findById(id).populate("cart");
       



        const cart = userData.cart.reverse();

        return res.json({
            status:"Успешно",
            data:cart,
        })

    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

module.exports = router;
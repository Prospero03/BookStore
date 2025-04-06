const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

router.put("/add-book-to-favorite", authenticateToken, async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite =userData.favorites.includes(bookid);
        if(isBookFavorite){
            return res.status(200).json({message: "Книга уже в избранном"}) 
        }
        
        await User.findByIdAndUpdate(id, {$push: {favorites: bookid}});
        return res.status(200).json({message: "Вы успешно добавили книгу в избранное"})
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})
router.put("/remove-book-from-favorite", authenticateToken, async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite =userData.favorites.includes(bookid);
        
        if(isBookFavorite){
            await User.findByIdAndUpdate(id, {$pull: {favorites: bookid}});
        }
        
        return res.status(200).json({message: "Книга удалена из избранного"})
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.get("/get-favorite-books", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;


        
        const userData = await User.findById(id).populate("favorites");
        const favoriteBooks = userData.favorites;
        

        
        
        
        return res.json({
            status: "Успешно",
            data: favoriteBooks,
        });
        
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})



module.exports = router;
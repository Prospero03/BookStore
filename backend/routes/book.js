const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

router.post("/add-book", authenticateToken, async (req,res) =>{
    try {
        //Ориентир на admin
        const {id} = req.headers;
        //Найти admin
        const user = await User.findById(id);

        //Если не admin
        if (user.role !== "admin"){
            return res
            .status(400)
            .json({error: "У вас нет доступа к функциям администратора"})
        }


        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            author: req.body.author,
            desc: req.body.desc,
            language: req.body.language,
        })
        await book.save();
        res.status(200).json({message: "Вы успешно добавили книгу"})
    } catch (error) {
        res.status(500).json({error: "Ошибка Сервера"})
    }
})

router.put("/update-book", authenticateToken, async(req,res) =>{
    try {
        const{bookid} = req.headers;

        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            author: req.body.author,
            desc: req.body.desc,
            language: req.body.language,
        })

        return res.status(200).json({message: "Книга отредактирова"})
    } catch (error) {
        
        return res.status(500).json({error: "Ошибка Сервера"})
    }
})

router.delete("/delete-book", authenticateToken, async(req,res)=>{
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({message: "Книга удалена"})
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.get("/get-all-books", async(req,res)=>{
    try {
        const books = await Book.find().sort({ createdAt: -1});

        return res.json(
            {   
                status: "Успешно",
                data: books,
            })

    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.get("/get-recent-books", async(req,res)=>{
    try {

        const books = await Book.find().sort({ createdAt: -1}).limit(4);

        return res.json({
            success: "Успешно",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

router.get("/get-book-by-id/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            success: "Успешно",
            data: book,
        })
    } catch (error) {
        return res.status(500).json({error: "Ошибка сервера"})
    }
})

module.exports = router;
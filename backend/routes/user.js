const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");

router.post("/sign-up", async(req,res)=>{
    try {
        const {username, email,  password, address} = req.body;

        //Username - unique
        const existingUsername = await User.findOne({username: username});
        if (existingUsername){
            return res.status(400).json({message: "Такое имя пользователя уже занято"})
        };

        //Email - unique
        const existingEmail = await User.findOne({email: email})
        if (existingEmail){
            return res.status(400).json({message: "Такой Email уже зарегистрирован"})
        }

        if (password.length < 4){
            return res
            .status(400)
            .json({message:"Введите пароль не меньше 4 символов"})
        }

        const hashPass = await bcrypt.hash(password,10)

        const newUser = new User ({
            username: username,
            email: email,
            password: hashPass,
            address:address,
        })

        

        await newUser.save();
        return res.status(200).json({message: "Вы успешно зарегистрировались"})

    } catch (error) {
        res.status(500).json({ error: "Ошибка Сервера"})
    }
});

router.post("/login", async(req,res)=>{
    try {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Неверные Данные"})
        }

        await bcrypt.compare(password, existingUser.password, (err,data)=>{
            if(data){
                const authClaims = [
                    { name: existingUser.username},
                    { role: existingUser.role},
                ]

                const token = jwt.sign({authClaims}, "bookStore123",{
                    expiresIn: "30d",
                });

                res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token,
                    message: "Вы успешно вошли"
                })
                
            }else{
                res.status(400).json({message: "Неверные Данные"})
            }
        })
    } catch (error) {
        res.status(500).json({error: "Ошибка Сервера"})
    }
});

router.get("/get-user-information",authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: "Ошибка Сервера"})
    }
});

router.put("/update-address", authenticateToken, async (req,res)=>{
    try {
        const {id}= req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message: "Успешно отредактирован"})
    } catch (error) {
        res.status(500).json({error: "Ошибка Сервера"})
    }
});

module.exports = router
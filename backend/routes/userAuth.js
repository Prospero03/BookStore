
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];  // Исправлено split(" ")

    if (token == null) {
        return res.status(401).json({ message: "Требуется токен авторизации" });
    }

    jwt.verify(token, "bookStore123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Пожалуйста авторизуйтесь снова" });
        }
        req.user = user;  // Теперь req.user содержит { userId, role } (из JWT)
        next();
    });
};

module.exports = authenticateToken; 
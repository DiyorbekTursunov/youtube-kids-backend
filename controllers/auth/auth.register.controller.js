const userModel = require("../../models/auth.model");
const jwt = require("jsonwebtoken");

const authRegister = async (req, res) => {
    const { username, lastname, password } = req.body
    try {
        if (username.length <= 2 || lastname.length <= 2) {
            return res.status(400).json({ message: "Malumotlarni to'liq kiriting" }); // Enter complete information

        } else if (password.length < 6) {
            return res.status(400).json({ message: "Parol 6 tadan ko'p bo'lishi kerak" }); // Password should be at least 6 characters long

        } else {
            const token = jwt.sign({ password }, process.env.JWT_SECRET_KEY);

            // Create new user or perform other logic here
            const newUser = await userModel.create({
                username,
                lastname,
                password: token,
            });

            res.status(201).json("foydalanuvchi yaratildi", newUser);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = authRegister;
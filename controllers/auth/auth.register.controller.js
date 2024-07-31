const userModel = require("../../models/auth.model");
const jwt = require("jsonwebtoken");

const authRegister = async (req, res) => {
    const { username, lastname, password } = req.body;

    try {
        // Validate input
        if (username.length <= 2 || lastname.length <= 2) {
            return res.status(400).json({ message: "Malumotlarni to'liq kiriting" }); // Enter complete information
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Parol 6 tadan ko'p bo'lishi kerak" }); // Password should be at least 6 characters long
        }

        // Check if user with the same lastname already exists
        const existingLastname = await userModel.findOne({ lastname });
        if (existingLastname) {
            return res.status(409).json({ message: "Foydalanuvchi shu familya bilan allaqchon mavjud" }); // User with this lastname already exists
        }

        // Hash the password
        const hashedPassword = jwt.sign({ password }, process.env.JWT_SECRET_KEY);
        // Get the current time in seconds

        // Example payload with username and current time
        const userVerification = jwt.sign({
            username, // Replace with actual username

            time: Math.floor(Date.now() / 1000), // 'iat' (issued at) claim
        },
            process.env.JWT_SECRET_KEY);


        // Create new user
        const newUser = new userModel({
            username,
            lastname,
            password: hashedPassword,
            verification: userVerification,
        });

        await newUser.save();

        res.status(201).json({ message: "Foydalanuvchi yaratildi", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = authRegister;
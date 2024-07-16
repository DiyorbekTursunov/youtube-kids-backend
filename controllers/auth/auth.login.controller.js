const userModel = require("../../models/auth.model");
const jwt = require("jsonwebtoken");

const authLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username.length <= 2 ) {
            return res.status(400).json({ message: "Malumotlarni to'liq kiriting" }); // Enter complete information
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Parol 6 tadan ko'p bo'lishi kerak" }); // Password should be at least 6 characters long
        }
        // Find the user by username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Foydalanuvchi topilmadi" }); // User not found
        }

        // Verify the password using jwt
        const decoded = jwt.verify(user.password, process.env.JWT_SECRET_KEY);

        if (decoded.password !== password) {
            return res.status(400).json({ message: "Parol noto'g'ri" }); // Incorrect password
        }

        const hashedPassword = jwt.sign({ password }, process.env.JWT_SECRET_KEY);

        // Example payload with username and current time
        // const userVerification = jwt.sign({
        //     username, // Replace with actual username

        //     time: Math.floor(Date.now() / 1000), // 'iat' (issued at) claim
        // },
        //     process.env.JWT_SECRET_KEY);

        res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli ilovaga kirdi", user: { username: user.username, lastname: user.lastname, password: hashedPassword, verification: user.verification, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = authLogin;

const userModel = require("../../models/auth.model");
const jwt = require("jsonwebtoken");

const authCheack = async (req, res) => {
    const { verification } = req.body;

    try {
        if (!verification) {
            return res.status(400).json({ message: "Malumotlarni to'liq kiriting" }); // Enter complete information
        }
        // Verify the password using jwt
        try {
            const decoded = jwt.verify(verification, process.env.JWT_SECRET_KEY)

            const user = await userModel.findOne({ username: decoded.username });

            if (!user) {
                return res.status(400).json({ message: "Foydalanuvchi topilmadi" }); // User not found
            }

            res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli ilovaga kirdi", user: { _id: user._id, username: user.username, lastname: user.lastname, password: user.password, verification: user.verification, role: user.role, liked_videos: user.liked_videos } });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "verification token buzilgan !!" }); // Enter complete information
        }
        ;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = authCheack;
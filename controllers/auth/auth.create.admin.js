const userModel = require("../../models/auth.model");

const updateUserRoleById = async (req, res) => {
    const { _id } = req.body; // Assuming _id is passed as a route parameter

    try {
        // Find user by ID and update their role
        const updatedUser = await userModel.findByIdAndUpdate(
            { _id }, // User ID to find
            { role: "ADMIN" }, // New role to set
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" }); // User not found
        }

        res.status(200).json({ message: "Foydalanuvchi roli yangilandi", user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
};

module.exports = {
    updateUserRoleById,
};

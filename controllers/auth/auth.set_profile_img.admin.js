const User = require("../../models/auth.model"); // Adjust the path as necessary

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const profile_img_url = req.body.profile_img_url; // Assuming profile_img_url is in the request body

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the profile_img_url field
        user.profile_img_url = profile_img_url;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    getProfile
};

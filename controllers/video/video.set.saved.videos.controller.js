const mongoose = require("mongoose");
const postModel = require("../../models/video.model");
const userModel = require("../../models/auth.model");

const setSavedVideoForUser = async (req, res) => {
    try {
        const { video_id, user_id } = req.body;

        // Validate input fields
        if (!video_id || !user_id) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Validate if the video_id and user_id are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(video_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid video_id or user_id" });
        }

        const user = await userModel.findById(user_id);
        const video = await postModel.findById(video_id);

        if (!user || !video) {
            return res.status(404).json({ message: "User or video not found" });
        }

        // Check if the user already saved the video
        const existingSavedVideo = video.saved_videos_user_id.find((v) => v === user_id.toString());

        if (existingSavedVideo) {
            return res.status(400).json({ message: "Video already saved by this user" });
        }

        video.saved_videos_user_id.unshift(user_id); // Save the user_id, not video_id

        await user.save();
        await video.save();

        return res.status(200).json({ message: "Video saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = setSavedVideoForUser;
const postModel = require("../../models/video.model");
const userModel = require("../../models/auth.model");


const setSavedVideoForUser = async (req, res) => {
    try {
        // get the video_id and user_id from the request body
        const { video_id, user_id } = req.body;

        // Validate input fields
        if (!video_id || !user_id) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await userModel.findById(user_id);
        const video = await postModel.findById(video_id);


        // Check if the user already saved the video
        if (!user && !video) {
            return res.status(404).json({ message: "Please fill all fields correctly" });
        }




        const existingSavedVideo = video.saved_videos_user_id.find((v) => v === user_id.toString());

        if (existingSavedVideo) {
            return res.status(400).json({ message: "Video already saved by this user" });
        }


        video.saved_videos_user_id.unshift(video_id);


        await user.save();
        await video.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports = setSavedVideoForUser
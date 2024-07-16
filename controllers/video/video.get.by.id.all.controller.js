const videoModel = require("../../models/video.model");

const getVideosByIds = async (req, res) => {
    try {
        // Get the videoIds from the request body
        const { videoIds } = req.body;

        // Validate input fields
        if (!Array.isArray(videoIds) || videoIds.length === 0) {
            return res.status(400).json({ message: "Invalid videoIds" });
        }

        console.log(videoIds);
        // Find all videos by videoIds
        const videos = await videoModel.find({ _id: { $in: videoIds } });

        if (videos.length === 0) {
            return res.status(404).json({ message: "No videos found" });
        }

        console.log(videos);
        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = getVideosByIds;
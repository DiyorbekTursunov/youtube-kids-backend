const postModel = require("../../models/video.model");

const getAllVideo = async (req, res) => {
    try {
        const allPosts = await postModel.find()

        res.status(200).json({
            posts: allPosts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = getAllVideo;
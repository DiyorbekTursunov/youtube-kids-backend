const postModel = require("../../models/video.model");


const getAllVideo = async (_, res) => {
    try {
        const allPosts = await postModel.find().lean(); // Use .lean() to convert to plain JavaScript object
        res.status(200).json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports = getAllVideo;
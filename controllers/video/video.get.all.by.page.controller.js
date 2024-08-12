const postModel = require("../../models/video.model");

const getAllVideoByPage = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided
        const skip = (page - 1) * limit;

        const allPosts = await postModel.find().skip(skip).limit(parseInt(limit)).lean(); // Use .lean() to convert to plain JavaScript object
        const totalPosts = await postModel.countDocuments();

        res.status(200).json({
            totalPosts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalPosts / limit),
            posts: allPosts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = getAllVideoByPage;
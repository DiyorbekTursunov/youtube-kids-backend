const postModel = require("../../models/video.model");

const searchVideosByTypeAndName = async (req, res) => {
    try {
        const { video_type, video_name } = req.query;

        // Build the query object
        const query = {};
        if (video_type) query.video_type = video_type;
        if (video_name) query.video_name = video_name;

        // Perform the query
        const posts = await postModel.find(query);

        // Return the results
        res.status(200).json(posts);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }   
}

module.exports = searchVideosByTypeAndName;

const postModel = require("../../models/video.model");


const delVideoById = async (req, res) => {
    try {
        // get the _id from the request body
        const { _id } = req.body;

        // Validate input fields
        if (!_id.length > 3) {
            return res.status(400).json({ message: "Please fill all fields" });
        }


        // delete the video
        const deletedVideo = await postModel.findByIdAndDelete(_id);
        res.status(200).json(deletedVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


module.exports = delVideoById;
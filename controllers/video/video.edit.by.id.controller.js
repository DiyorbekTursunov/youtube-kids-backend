const postModel = require("../../models/video.model");


const editVideoById = async (req, res) => {
    try {
        const {
            video_youtube_id,
            video_img_url,
            video_name,
            video_description,
            video_views,
            video_likes,
            video_clicked_count,
            video_rec_controller,
            video_type
        } = req.body;

        // Validate input fields
        if (!video_youtube_id || !video_img_url || !video_name || !video_description || !video_views || !video_likes || !video_clicked_count || !video_rec_controller || !video_type) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Create a new video document using the model's create method
        const editedVideo = await postModel.updateOne({
            video_youtube_id,
            video_img_url,
            video_name,
            video_description,
            video_views,
            video_likes,
            video_clicked_count,
            video_rec_controller,
            video_type
        });

        res.status(201).json(editedVideo); // Return the newly created video object
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


module.exports = editVideoById;
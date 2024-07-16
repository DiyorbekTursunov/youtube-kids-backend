const User = require('../../models/auth.model');
const Video = require('../../models/video.model');

const setVideoLike = async (req, res) => {
    const { userId, videoId } = req.body; // Assuming userId and videoId are provided in the request body

    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the video by videoId
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }


        const checkUserIsLiked = video.liked_videos_user_id.find((v) => v._id === user._id.toString())


        if (checkUserIsLiked) {
            return res.status(400).json({ message: 'Video already liked' });
        }




        video.liked_videos_user_id.unshift(user._id);
        video.video_likes += 1


        console.log(video.liked_videos_user_id, video.video_likes);
        
        await user.save();
        await video.save();

        // Respond with success message or updated user object
        res.status(200).json({ message: "Added recently viewed video" });

    } catch (error) {
        console.error('Error adding recently viewed video:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = setVideoLike;
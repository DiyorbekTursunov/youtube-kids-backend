const User = require('../../models/auth.model');
const Video = require('../../models/video.model');

const getRecentlyViewedVideos = async (req, res) => {
    const { userId } = req.query; // Assuming userId is passed as a route parameter
    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract recently viewed videos
        const recentlyViewedVideos = user.recently_viewed_videos;

        // Respond with the list of recently viewed videos
        res.status(200).json({ message: 'This is user recently_viewed_videos', recentlyViewedVideos });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = getRecentlyViewedVideos;
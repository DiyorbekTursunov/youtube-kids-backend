const User = require('../../models/auth.model');
const Video = require('../../models/video.model');

const addRecentlyViewedVideoForUser = async (req, res) => {
    const { userId, videoId } = req.body;

    try {
        // Find the user and video concurrently using Promise.all for efficiency
        const [user, video] = await Promise.all([
            User.findById(userId),
            Video.findById(videoId)
        ]);

        if (!user || !video) {
            return res.status(404).json({ message: !user ? 'User not found' : 'Video not found' });
        }

        // Check if the user's ID already exists in the recently viewed videos
        const userIdStr = user._id.toString();
        const userIndex = video.recently_viewed_videos_user_id.findIndex(uId => uId.toString() === userIdStr);

        if (userIndex !== -1) {
            // Move the user's ID to the front if it exists
            video.recently_viewed_videos_user_id.splice(userIndex, 1);
            video.recently_viewed_videos_user_id.unshift(user._id);

            return res.status(200).json({ message: 'Video moved to the front of recently viewed videos' });
        }

        // Add the user to the recently viewed videos and increment the view count
        video.recently_viewed_videos_user_id.unshift(user._id);
        video.video_views += 1;

        // Save the updated video object
        await video.save();

        // Respond with success message or updated recently viewed videos
        res.status(200).json({ message: "Video added to recently viewed videos", recentlyViewedVideos: video.recently_viewed_videos_user_id });
    } catch (error) {
        console.error('Error adding recently viewed video:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = addRecentlyViewedVideoForUser;
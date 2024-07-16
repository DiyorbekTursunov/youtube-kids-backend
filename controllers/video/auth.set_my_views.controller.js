const User = require('../../models/auth.model');
const Video = require('../../models/video.model');

const addRecentlyViewedVideoForUser = async (req, res) => {
    const { userId, videoId } = req.body;

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

        // Remove user's _id from recently_viewed_videos array if it exists
        const recently_viewed_videos_user_id_is_exist = video.recently_viewed_videos_user_id.find(uId => uId._id.toString() === user._id.toString());

        if (recently_viewed_videos_user_id_is_exist) {
            video.recently_viewed_videos_user_id = video.recently_viewed_videos_user_id.filter(uId => uId.toString() !== user._id.toString());

            console.log(video.recently_viewed_videos_user_id, video.video_views);

            video.recently_viewed_videos_user_id.unshift({ _id: user._id });
            // Increment video views count


            return res.status(200).json({ message: 'Video add to views but not edded count' });
        }

        video.video_views += 1;
        video.recently_viewed_videos_user_id.unshift({ _id: user._id });

        console.log(video.recently_viewed_videos_user_id, video.video_views);

        // Save the updated video object
        await video.save();

        // Respond with success message or updated recently viewed videos
        res.status(200).json({ message: "Video moved to the front of recently viewed videos", recentlyViewedVideos: video.recently_viewed_videos_user_id });
    } catch (error) {
        console.error('Error adding recently viewed video:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = addRecentlyViewedVideoForUser;
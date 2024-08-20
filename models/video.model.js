const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const formatDate = () => {
    const now = new Date();
    const options = { year: 'numeric', day: '2-digit', month: 'long' };
    return now.toLocaleDateString('en-GB', options).replace(/ /g, ', ');
};


const post_schema = new Schema({
    video_id: {
        type: String,
        // required: true
    },
    video_youtube_id: {
        type: String,
        required: true
    },
    video_img_url: {
        type: String,
        required: true
    },
    video_name: {
        type: String,
        required: true
    },
    video_description: {
        type: String,
        required: true
    },
    video_views: {
        type: Number,
        default: 0,
        required: true
    },
    updatedAt: {
        type: String,
        default: formatDate,
    },
    video_likes: {
        type: Number,
        default: 0,
        required: true
    },
    video_rec_controller: {
        type: String,
        required: true
    },
    video_type: {
        type: String,
        required: true
    },
    liked_videos_user_id: [{
        _id: String,
    }],
    recently_viewed_videos_user_id: [{
        _id: String
    }],
    saved_videos_user_id: [{
        _id: String
    }],
})



module.exports = model("Post", post_schema)
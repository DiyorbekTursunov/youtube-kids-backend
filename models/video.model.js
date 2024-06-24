const mongoose = require("mongoose");

const { Schema, model } = mongoose;

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
        type: String,
        required: true
    },
    video_likes: {
        type: String,
        required: true
    },
    video_clicked_count: {
        type: String,
        required: true
    },
    video_rec_controller: {
        type: String,
        required: true
    },
    video_type: {
        type: String,
        required: true
    }
})



module.exports = model("Post", post_schema)
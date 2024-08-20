const express = require("express");
const router = express.Router();

const getAllVideo = require("../controllers/video/video.get.all.controller");
const getAllVideoByPage = require("../controllers/video/video.get.all.by.page.controller");

const createVideo = require("../controllers/video/video.create.controllers");
const getVideoById = require("../controllers/video/video.get.by.id.all.controller");
const delVideoById = require("../controllers/video/video.del.by.id.controller");
const editVideoById = require("../controllers/video/video.edit.by.id.controller");
const setVideoLike = require("../controllers/video/video.set.like.controller");
const addRecentlyViewedVideoForUser = require("../controllers/video/auth.set_my_views.controller");
const searchVideosByTypeAndName = require("../controllers/video/video.search.videos.by.type.name");



router.get('/get-all', getAllVideo);
router.get('/get-all-by-page', getAllVideoByPage);
router.get('/search-videos', searchVideosByTypeAndName);
router.post('/get-by-id', getVideoById);
router.post('/create', createVideo);
router.delete('/delete', delVideoById);
router.put('/edit', editVideoById);
router.post('/set-like', setVideoLike);
router.post('/set_my_views', addRecentlyViewedVideoForUser);
router.post('/set_saved_views', addRecentlyViewedVideoForUser);


module.exports = router;
const express = require("express");
const router = express.Router();

const createVideo = require("../controllers/video/video.create.controllers");
const getAllVideo = require("../controllers/video/video.get.all.controller");
const getVideoById = require("../controllers/video/video.get.by.id.all.controller");
const delVideoById = require("../controllers/video/video.del.by.id.controller");
const editVideoById = require("../controllers/video/video.edit.by.id.controller");
const setVideoLike = require("../controllers/video/video.set.like.controller");
const addRecentlyViewedVideoForUser = require("../controllers/video/auth.set_my_views.controller");



router.get('/get-all', getAllVideo);
router.post('/get-by-id', getVideoById);
router.post('/create', createVideo);
router.delete('/delete', delVideoById);
router.put('/edit', editVideoById);
router.post('/set-like', setVideoLike);
router.post('/set_my_views', addRecentlyViewedVideoForUser);


module.exports = router;
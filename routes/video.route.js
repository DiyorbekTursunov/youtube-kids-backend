const express = require("express");
const router = express.Router();

const createVideo = require("../controllers/video/video.create.controllers");
const getAllVideo = require("../controllers/video/video.get.all.controller");
const delVideoById = require("../controllers/video/video.del.by.id.controller");
const editVideoById = require("../controllers/video/video.edit.by.id.controller");


router.get('/get-all', getAllVideo);
router.post('/create', createVideo);
router.delete('/delete', delVideoById);
router.put('/edit', editVideoById);


module.exports = router;
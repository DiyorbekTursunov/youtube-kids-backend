const express = require("express");
const router = express.Router();

const authLogin = require("../controllers/auth/auth.login.controller");
const authRegister = require("../controllers/auth/auth.register.controller");
const authCheack = require("../controllers/auth/auth.cheack.controller");
const getRecentlyViewedVideos = require("../controllers/auth/auth.get_my_views.controller");
const { updateUserRoleById } = require("../controllers/auth/auth.create.admin");
const { getProfile } = require("../controllers/auth/auth.set_profile_img.admin");

router.post('/login', authLogin);
router.post('/register', authRegister);
router.post('/check', authCheack);
router.get('/get_my_views', getRecentlyViewedVideos);
router.put('/set_admin', updateUserRoleById);
router.put("/profile", getProfile);




// router.delete('/del',  async (req, res) => {
//     const del = await userModel.deleteMany()
//     res.status(200).json(del)
// });


module.exports = router;    
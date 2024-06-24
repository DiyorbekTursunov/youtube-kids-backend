const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            massage:"It works"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
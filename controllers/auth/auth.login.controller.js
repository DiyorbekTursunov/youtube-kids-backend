const postModel = require("../../models/video.model");


const authLogin = async (req, res) => {
    try {
        
        // res.status(201).json(newVideo); // Return the newly created video object
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = authLogin;
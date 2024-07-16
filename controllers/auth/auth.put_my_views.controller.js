const User = require('../../models/auth.model');
const Video = require('../../models/video.model');

const authCheack = async (req, res) => {
    const { userId } = req.body; // Assuming userId is provided in the request body

    try {
        // // Delete the user by userId
        // const result = await User.deleteOne({ _id: userId });
        // if (result.deletedCount === 0) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // return res.status(200).json({ message: 'User deleted' });

    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = authCheack;
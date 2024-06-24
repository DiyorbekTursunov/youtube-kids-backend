const mongoose = require("mongoose");

const connect_db = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log("Connected to DB");
            })
    } catch (error) {
        console.log("DB Error: ", error);
        // IN PRODUCTION 
        // throw new Error(error);
    }
}


module.exports = { connect_db };
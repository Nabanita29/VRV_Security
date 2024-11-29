const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database connected : ${connection.connection.host}, ${connection.connection.name}`);  
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = dbConnect;
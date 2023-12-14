import mongoose from 'mongoose';

const Connection = async () => {
    const URL = process.env.URL;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error while connecting with database: ', error);
        // console.log("hello there is error while connecting with mongodb");
    }

};

export default Connection;
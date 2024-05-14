import mongoose from "mongoose";

const mongoURI = process.env.MONGOURI;

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI);
        console.log("Connected to DB Successfully!");
    } catch (error) {
        console.log(error);
    }
};

export default connectToMongo;

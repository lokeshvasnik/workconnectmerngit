import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    name: {
        requred: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    location: {
        required: true,
        type: String,
    },
    pincode: {
        required: true,
        type: String,
    },
    user_id: {
        required: true,
        type: String,
    },
    image: {
        type: String,
    },
    number: {
        type: String,
        requred: true,
    },
});

const Jobs = mongoose.model("job", jobsSchema);

export default Jobs;

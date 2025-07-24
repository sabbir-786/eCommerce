import mongoose from "mongoose";

const featureImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("FeatureImage", featureImageSchema);

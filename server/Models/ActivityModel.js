const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        itineraryId: {
            type: mongoose.Types.ObjectId,
            ref: "Itinerary",
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        link: {
            type: String,
            unique: true,
        },
        address: {
            type: String,
        },
        openingHours: {
            type: String,
        },
        remark: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        }
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model("Activity", activitySchema);
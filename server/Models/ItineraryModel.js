const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
            required: true,
        },
        cities: {
            type: [String],
            default: [],
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        groupSize: {
            type: Number,
            default: 1,
        },
        interests: {
            type: [String],
            default: [],
        },
        demographics: {
            type: [String],
            default: [],
        },
        activities: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Activity",
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
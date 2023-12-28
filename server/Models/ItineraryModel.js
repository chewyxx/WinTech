const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
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
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
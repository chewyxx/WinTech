const User = require("../Models/UserModel");
const Itinerary = require("../Models/ItineraryModel");

// create itinerary
module.exports.createItinerary = async (req, res) => {
    const userId = req.params.userId;
    const { title, country, cities, startDate, endDate , groupSize, interests, demographics } = req.body;

    try {
        if (!title || !country || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Title, country, start date, and end date are required",
            })
        }

        const itinerary = await Itinerary.create({
            userId: userId,
            title: title,
            country: country,
            cities: cities,
            startDate: startDate,
            endDate: endDate,
            groupSize: groupSize,
            interests: interests,
            demographics: demographics,
        });

        await User.findByIdAndUpdate(userId, {
            $push: { itineraries: itinerary._id },
        });

        res.status(200).json({
            success: true,
            message: "Itinerary is created",
            data: itinerary,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Itinerary is not created",
        })
    }
};

// delete itinerary
module.exports.deleteItinerary = async (req, res) => {
    const { userId, id } = req.params;

    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(id);

        await User.findByIdAndUpdate(userId, {
            $pull: { itineraries: id },
        });

        res.status(200).json({
            success: true,
            message: "Itinerary is deleted",
            data: deletedItinerary,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Itinerary is not deleted",
        });
    }
};

// update itinerary
module.exports.updateItinerary = async (req, res) => {
    const { userId, id } = req.params;

    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        // dont need to update user's itineraries array because no change in itinerary id

        res.status(200).json({
            success: true,
            message: "Itinerary is updated",
            data: updatedItinerary,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Itinerary is not updated",
        });
    }
};

// get single itinerary
module.exports.getItinerary = async (req, res) => {
    const { userId, id } = req.params;

    try {
        const itinerary = await Itinerary.findById(id);

        res.status(200).json({
            success: true,
            message: "Itinerary is found",
            data: itinerary,
        });
    
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Itinerary is not found",
        });
    }
};

// get all itineraries
module.exports.getItineraries = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const itineraries = await Itinerary.find({ userId: userId });
        res.status(200).json({
            success: true,
            message: "Itineraries are found",
            data: itineraries,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Itineraries are not found",
        });
    }
};
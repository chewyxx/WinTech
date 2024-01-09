const Itinerary = require("../Models/ItineraryModel");
const Activity = require("../Models/ActivityModel");

// create activity
module.exports.createActivity = async (req, res) => {
    const itineraryId = req.params.itineraryId;
    const { title, link, address, openingHours, remark, date } = req.body;

    try {
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            })
        }

        const activity = await Activity.create({
            itineraryId: itineraryId,
            title: title,
            link: link,
            address: address,
            openingHours: openingHours,
            remark: remark,
            date: date,
        });

        await Itinerary.findByIdAndUpdate(itineraryId, {
            $push: { activities: activity._id },
        });

        res.status(200).json({
            success: true,
            message: "Activity is created",
            data: activity,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Activity is not created",
        })
    }
};

// delete activity
module.exports.deleteActivity = async (req, res) => {
    const { itineraryId, id } = req.params;

    try {
        const deletedActivity = await Activity.findByIdAndDelete(id);

        await Itinerary.findByIdAndUpdate(itineraryId, {
            $pull: { activities: id },
        });

        res.status(200).json({
            success: true,
            message: "Activity is deleted",
            data: deletedActivity,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Activity is not deleted",
        })
    }
};

// update activity
module.exports.updateActivity = async (req, res) => {
    const { itineraryId, id } = req.params;

    try {
        const updatedActivity = await Activity.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Activity is updated",
            data: updatedActivity,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Activity is not updated",
        })
    }
};

// get single activity
module.exports.getActivity = async (req, res) => {
    const { itineraryId, id } = req.params;

    try {
        const activity = await Activity.findById(id);

        res.status(200).json({
            success: true,
            message: "Activity is found",
            data: activity,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Activity is not found",
        })
    }
};

// get all activities
module.exports.getActivities = async (req, res, next) => {
    const { itineraryId } = req.params;

    try {
        const activities = await Activity.find({ itineraryId: itineraryId });
        
        res.status(200).json({
            success: true,
            message: "Activities are found",
            data: activities,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Activities are not found",
        })
    }
};
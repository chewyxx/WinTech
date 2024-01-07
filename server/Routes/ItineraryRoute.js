const { createItinerary, deleteItinerary, updateItinerary, getItinerary, getItineraries } = require('../Controllers/ItineraryController');
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Public/Images/Itineraries");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({storage, fileFilter});

// create itinerary
router.post('/:userId', upload.single('image'), createItinerary);

// delete itinerary
router.delete('/:userId/:id', deleteItinerary);

// update itinerary
router.put('/:userId/:id', updateItinerary);

// get itinerary
router.get('/:userId/:id', getItinerary);

// get all itineraries
router.get('/:userId', getItineraries);

module.exports = router;
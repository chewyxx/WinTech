const { createItinerary, deleteItinerary, updateItinerary, getItinerary, getItineraries } = require('../Controllers/ItineraryController');
const router = require("express").Router();

// create itinerary
router.post('/:userId', createItinerary);

// delete itinerary
router.delete('/:userId/:id', deleteItinerary);

// update itinerary
router.put('/:userId/:id', updateItinerary);

// get itinerary
router.get('/:userId/:id', getItinerary);

// get all itineraries
router.get('/:userId', getItineraries);

module.exports = router;
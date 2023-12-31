const { createActivity, deleteActivity, updateActivity, getActivity, getActivities } = require('../Controllers/ActivityController');
const router = require("express").Router();

// create activity
router.post('/:itineraryId', createActivity);

// delete activity
router.delete('/:itineraryId/:id', deleteActivity);

// update activity
router.put('/:itineraryId/:id', updateActivity);

// get activity
router.get('/:itineraryId/:id', getActivity);

// get all activities
router.get('/:itineraryId', getActivities);

module.exports = router;
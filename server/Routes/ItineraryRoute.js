const Itinerary = require('../Models/ItineraryModel');
const router = require("express").Router();


// route to create itinerary
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.country ||
      !req.body.startDate ||
      !req.body.endDate
    ) {
      return res.status(400).send({
        message: 'Fill in all required fields: title, country, start and end date.',
      });
    }

    const newItinerary = {
      title: req.body.title,
      country: req.body.country,
      cities: req.body.cities,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    console.log(newItinerary);
    const itinerary = await Itinerary.create(newItinerary)

    return res.status(201).send(itinerary);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to get all itineraries from db
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({});
    return res.status(200).json({
      count: itineraries.length,
      data: itineraries
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to get an itinerary from db by id
router.get('/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);
    return res.status(200).json(itinerary);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to update itinerary
router.put('/:id', async(req, res) => {
    try {

      if (
        !req.body.title ||
        !req.body.country ||
        !req.body.startDate ||
        !req.body.endDate
      ) {
        return res.status(400).send({
          message: 'Fill in all required fields: title, country, start and end date.',
        });
      }

      const { id } = req.params;
      const result = await Itinerary.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }

      return res.status(200).send({ message: 'Itinerary updated successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message })
    }
});

// route to delete an itinerary
router.delete('/:id', async(req, res) => {
    try {
      const { id } = req.params;
      const result = await Itinerary.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: 'Itinerary not found' })
      }

      return res.status(200).send({ message: 'Itinerary deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message })
    }
});

module.exports = router;
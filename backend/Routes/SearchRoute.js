const express = require('express');
const Events = require('../Models/EventModel');
const router = express.Router();

// Search for all Events filterd by Location
router.post('/', async (request, response) => {

    const { event_name, location } = request.body;

    try {
        const events = await Events.find(
            {
                $and: [
                    { location: { $regex: location, $options: "gi" } },
                    { event_name: { $regex: event_name, $options: "gi" } }
                ]
            }).populate('category_id');

        return response.send(events)

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});


module.exports = router
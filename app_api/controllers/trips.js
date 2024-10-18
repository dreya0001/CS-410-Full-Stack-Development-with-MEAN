const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        console.log(trips); // Uncomment to show results of query
        return res.status(200).json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec();
        console.log(trip); // Uncomment to show results of query
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (err) {
        console.error('Error fetching trip by code:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    const { code, name, length, start, resort, perPerson, image, description } = req.body;

    // Validate required fields
    if (!code || !name || !length || !start || !resort || !perPerson || !image || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newTrip = new Trip({
        code,
        name,
        length,
        start,
        resort,
        perPerson,
        image,
        description
    });

    try {
        const savedTrip = await newTrip.save();
        console.log(savedTrip); // Uncomment to show results of operation
        return res.status(201).json(savedTrip);
    } catch (err) {
        console.error('Error saving trip:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const { code, name, length, start, resort, perPerson, image, description } = req.body;

    // Validate required fields
    if (!code || !name || !length || !start || !resort || !perPerson || !image || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedTrip = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code,
                name,
                length,
                start,
                resort,
                perPerson,
                image,
                description
            },
            { new: true } // Return the updated document
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(updatedTrip); // Return the updated trip
    } catch (err) {
        console.error('Error updating trip:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip // Add this line to export the new method
};
const express = require('express'); //Express app
const router = express.Router(); // Router logic

//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips
router
    .route('/trips')
    .get(tripsController.tripsList); // GET method routes tripsList

//Gets Method routes tripsFindBYCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
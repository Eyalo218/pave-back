const reviewService = require('../services/reviewService')

function addReviewRoutes(app) {
    app.get('/reviews/:tripId', (req, res) => {
        const tripId = req.params.tripId;
        reviewService.getByTripId(tripId)
            .then(trip => res.json(trip))
    })
}

module.exports = addReviewRoutes;
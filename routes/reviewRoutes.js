const reviewService = require('../services/reviewService')

function addReviewRoutes(app) {
    app.get('/reviews/:tripId', (req, res) => {
        const tripId = req.params.tripId;
        reviewService.getByTripId(tripId)
            .then(trip => res.json(trip))
    })

    app.post('/reviews', (req, res) => {
        const review = req.body;
        userService.add(review)
            .then(review => {
                res.json(review)
            })
    })
}

module.exports = addReviewRoutes;
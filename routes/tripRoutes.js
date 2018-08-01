const TRIP_URL = '/trips';
const tripService = require('../services/tripService')
// const reviewService = require('../services/reviewService')


function addTripRoutes(app) {
    app.get('/trips', (req, res) => {
        const searchedText = req.query.searchedText;
        if (searchedText === '') {
            tripService.query()
                .then((trips) => res.json(trips))
                .then(trips => res.send(trips))
        }
        else {
            tripService.getByText(searchedText)
                .then((trips) => {
                    console.log(trips);
                    
                    res.json(trips)
                })
                .then(trips => {
                    res.send(trips);
                })
        }

    })

    app.get('/trips/:tripId', (req, res) => {
        const tripId = req.params.tripId;
        tripService.getById(tripId)
            .then(trip => res.json(trip))
    })

    app.delete('/trips/:tripId', (req, res) => {
        const tripId = req.params.tripId;
        tripService.remove(tripId)
            .then(() => res.end(`trip ${tripId} Deleted `))
    })

    app.post('/trips', (req, res) => {
        const trip = req.body;
        tripService.add(trip)
            .then(trip => {
                res.json(trip)
            })
    })

    app.put('/trips/:tripId', (req, res) => {
        const trip = req.body;
        tripService.update(trip)
            .then(trip => {
                return res.json(trip)
            })
    })

}

module.exports = addTripRoutes


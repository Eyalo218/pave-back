const TRIP_URL = '/trips';
const tripService = require('../services/tripService')
// const reviewService = require('../services/reviewService')


function addTripRoutes(app) {
    app.get('/trips', (req, res) => {
        const userId = req.query.userId;
        const searchedText = req.query.searchedText;
        var isActive = req.query.isActive;
        isActive = isActive === 'true' ? true : false;

        console.log('asdsadsdasd is active', isActive);

        if (!searchedText && !userId) {
            if (isActive) {
                return tripService.getByActiveTrips()
                    .then((trips) => res.json(trips))
                    .then(trips => res.send(trips));
            }
            else {
                return tripService.query()
                    .then((trips) => {
                        res.json(trips)
                    })
                    .then(trips => {
                        res.send(trips)
                    })
            }
        } else if (!searchedText && userId) {
            return tripService.getTripsByUserId(userId)
                .then((trips) => res.json(trips))
                .then(trips => res.send(trips))
        }
        else if (searchedText) {
            tripService.getByText(searchedText)
                .then((trips) => {
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
        return tripService.add(trip)
            .then(trip => res.json(trip))
    })

    app.put('/trips/:tripId', (req, res) => {
        const trip = req.body;
        console.log('the edited trip:',trip);
        
        tripService.update(trip)
            .then(trip => {
                return res.json(trip)
            })
    })
}

module.exports = addTripRoutes


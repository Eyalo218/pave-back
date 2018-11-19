const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');
const noImgPaveUrl = 'https://res.cloudinary.com/pavelol5/image/upload/v1541341603/no-images-pave.png';

function query() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({}).toArray()
            // return Promise.resolve(currReviews)
        })
}

function getById(tripId) {
    tripId = new ObjectId(tripId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.findOne({ _id: tripId })
        })
}

function getByText(searchedText) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({
                $where:
                    `return ('${searchedText.toLowerCase()}' === this.title.toLowerCase().substr(0,${searchedText.length}))
                     || ('${searchedText.toLowerCase()}' === this.country.toLowerCase().substr(0,${searchedText.length}))`
            }).toArray();
        })
}

function getByMatchedCountries(searchedText) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({ country: searchedText }).toArray();
        })
}

function getByActiveTrips() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({ isActive: true }).toArray();
        })
}

function getTripsByUserId(userId) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({ userId: userId }).toArray()
        })
}

function remove(tripId) {
    tripId = new ObjectId(tripId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.remove({ _id: tripId })
        })
}

function add(trip) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.insertOne(trip)
                .then(result => {
                    trip._id = result.insertedId;
                    return trip;
                })
        })
}

function update(trip) {
    if (trip.image === noImgPaveUrl) trip.image = trip.markers[0].photos[0];
    trip._id = new ObjectId(trip._id)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.updateOne({ _id: trip._id }, { $set: trip })
                .then(result => {
                    return trip;
                })
        })
}




module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    getByText,
    getTripsByUserId,
    getByMatchedCountries,
    getByActiveTrips
}
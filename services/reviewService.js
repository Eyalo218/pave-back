const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('reviews');
            return collection.find({}).toArray()
            return Promise.resolve(currReviews)
        })
}

function getByTripId(_tripId) {    
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('reviews');
            return collection.find({ tripId: _tripId }).toArray()
        })
}


function remove(tripId) {
    tripId = new ObjectId(tripId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('reviews');
            return collection.remove({ _id: tripId })
        })
}

function add(review) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('reviews');
            return collection.insertOne(review)
                .then(result => {
                    review._id = result.insertedId;
                    return review;
                })
        })
}

module.exports = {
    query,
    getByTripId,
    remove,
    add
}
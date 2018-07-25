const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.find({}).toArray()
            return Promise.resolve(currReviews)
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
    update
}
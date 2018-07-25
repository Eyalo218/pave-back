const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function querys() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return collection.find({}).toArray()
            return Promise.resolve(currReviews)
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return collection.findOne({ _id: userId })
        })
}

function remove(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return collection.remove({ _id: userId })
        })
}

function add(user) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return collection.insertOne(user)
                .then(result => {
                    user._id = result.insertedId;
                    return user;
                })
        })
}

function update(user) {
    user._id = new ObjectId(user._id)
    return mongoService.connectToMongo()

        .then(db => {
            const collection = db.collection('users');
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user;
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
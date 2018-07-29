const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query({ userId = null, tripId = null } = {}) {
    const criteria = {};
    if (userId) criteria.userId = new ObjectId(userId);
    if (tripId) criteria.tripId = new ObjectId(tripId);
    return mongoService.connect().then(db => {
        return db.collection('reviews')
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'trips',
                        localField: 'tripId',
                        foreignField: '_id',
                        as: 'trips'
                    }
                },
                {
                    $unwind: '$trips'
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: '$users'
                }
            ]).toArray()
    })
}

function addReview({ userId, tripId, rank,reviewDesc }) {
    var review = {
        userId: new ObjectId(userId),
        tripId: new ObjectId(tripId),
        rank,
        reviewDesc,
    }
    return mongoService.connect()
        .then(db => db.collection('reviews').insertOne(review))
        // .then (({insertedId: _id}) => ({...review, _id}))
        .then(res => {
            review._id = res.insertedId
            return getById(res.insertedId)
        })
}

function getTripReviews(tripId) {
    const id = new ObjectId(tripId)
    return mongoService.connect()
        .then(db =>
            db.collection('reviews').aggregate([
                {
                    $match: { tripId: id }
                },
                {
                    $lookup:
                    {
                        from: 'trips',
                        localField: 'tripId',
                        foreignField: '_id',
                        as: 'trips'
                    }
                }, {
                    $unwind: '$trips'
                }
            ]).toArray()
        )

}

function getById(reviewId) {
    const _id = new ObjectId(reviewId)
    return mongoService.connect()
        // .then(db => db.collection('review').findOne({ _id }))
        .then(db => {
            return db.collection('reviews').aggregate([
                {
                    $match: {_id : _id}
                },
                {
                    $lookup:
                    {
                        from: 'trips',
                        localField: 'tripId',
                        foreignField: '_id',
                        as: 'trips'
                    }
                },
                {
                    $unwind: '$trips'
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: '$users'
                }
            ]).toArray()
            .then(reviews => reviews[0])
        })
}

module.exports = {
    query,
    addReview,
    getById,
    getTripReviews
}
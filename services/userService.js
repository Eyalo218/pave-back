const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query() {
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


function update(user) {
    user._id = new ObjectId(user._id)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(res => {
                    console.log(res);
                    return res;
                })
        })
}

function deleteTrip(user) {
    // user._id = new ObjectId(user._id);
    user.tripId = new ObjectId(user.tripId);
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('trips');
            return collection.deleteOne({ _id: user.tripId })
                .then(() => {
                    console.log('delted');
                })
            // return collection.updateOne({ _id: user._id }, { $set: user })
            //     .then(res => {
            //         console.log(res);
            //         return res;
            //     })
        })
}

function deletePin(user) {
    // user.userId = new ObjectId(user.userId);
    let pintoDelete = user.tripId;
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('users');
            return getById(user.userId).then(user => {
                user.pins = user.pins.filter(pin => pin !== pintoDelete);
                console.log(user.pins);
                return update(user)
                    .then(() => user.pins);
            })
            // return collection.deleteOne({ _id: user.tripId })
            //     .then(() => {
            //         console.log('delted');
            //     })
            // return collection.updateOne({ _id: user._id }, { $set: user })
            //     .then(res => {
            //         console.log(res);
            //         return res;
            //     })
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

function checkLogin(creds) {
    return mongoService.connectToMongo()
        .then(db => {
            console.log(creds);
            const collection = db.collection('users');
            return collection.findOne({ "name": `${creds.name}`, "password": `${creds.password}` })
                .then(user => {
                    console.log('This IS Tha user', user);
                    if (user) {
                        console.log('userrrr', user);

                        return user;
                    } else return Promise.reject()
                })
        })
}



// console.log('checkLogin');
// console.log('checkLogin user service-SERVER, creds=', creds);
// var user = db.users.find(`{"name": "${creds.name}", "name": "${creds.password}"}`)
// // var user = db.users.find({ "name": creds.name, "password": creds.password })
// console.log('user, after filter: ', user);
// if (user) {
//     var userToResolve = {...user}
//     // delete userToResolve.password;
//     return Promise.resolve(userToResolve)
// } else return Promise.reject()




module.exports = {
    query,
    getById,
    remove,
    add,
    checkLogin,
    update,
    deleteTrip,
    deletePin
}
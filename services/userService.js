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
                .then(() => {
                    return user;
                })
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
            const collection = db.collection('users');
                return collection.find({"name": `${creds.name}`, "name": `${creds.password}`}).toArray()
                    .then(user => {
                        console.log('This IS Tha user', user)
                        if (user) {
                            var userToResolve = {...user}
                            // delete userToResolve.password;
                            return Promise.resolve(userToResolve)
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
    update
}
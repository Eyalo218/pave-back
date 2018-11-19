const USER_URL = '/users';
const userService = require('../services/userService')
// const reviewService = require('../services/reviewService')


function addUserRoutes(app) {

    app.get('/users', (req, res) => {
        userService.query()
            .then((users) => res.json(users))
            .then(users => res.send(users))
    })

    app.get('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        return userService.getById(userId)
            .then(user => res.json(user))
    })

    app.delete('/users/:userId', (req, res) => {
        console.log(req.body);
        // const userId = req.query.userId;
        // const searchedText = req.query.searchedText;
        // const isComplete = req.query.isComplete;
        // userService.remove(userId)
        //     .then(() => res.end(`user ${userId} Deleted `))
    })

    app.post(`${USER_URL}/signup`, (req, res) => {
        const user = req.body;
        user.pins = [];
        user.trips = [];
        return userService.add(user)
            .then(user => {
                req.session.loggedInUser = user.name;
                res.json(user)
            })
    })
    app.post(`${USER_URL}/checkLogin`, (req, res) => {
        const credentials = req.body
        userService.checkLogin(credentials)
            .then(user => {
                console.log(user);
                console.log('the user:', user);
                // TODO: entire user
                req.session.loggedinUser = user.name;
                res.json(user);
            })
            .catch(err => {
                res.status(401).send('Wrong user/pass')
            })
    });

    app.put('/users/:userId', (req, res) => {
        const user = req.body;
        if (user.shouldDeleteTrip) {
            return userService.deleteTrip(user)
                .then(user => res.json(user))
        }
        if (user.shouldDeletePin) {
            return userService.deletePin(user)
                .then(user => res.json(user))
        }
        return userService.update(user)
            .then(user => res.json(user))
    })
}

module.exports = addUserRoutes


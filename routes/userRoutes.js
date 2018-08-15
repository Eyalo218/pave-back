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
        const userDetails = req.body;
        console.log('Hi', userDetails)
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
        return userService.checkLogin(credentials)
            .then(user => {
                // TODO: entire user
                req.session.loggedinUser = user.name;
                return res.json(user[0])
            })
            .catch(err => {
                res.status(401).send('Wrong user/pass')
            })
    });

    app.put('/users/:userId', (req, res) => {
        const user = req.body;
        return userService.update(user)
            .then(user => res.json(user))
    })
}

module.exports = addUserRoutes


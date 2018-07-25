const USER_URL = '/users';
const userService = require('../services/userService')
// const reviewService = require('../services/reviewService')


function addUserRoutes(app) {
    app.get('/users', (req, res) => {
        console.log('swalala2');
        userService.query()
        .then((users) => res.json(users))
        .then(users => res.send(users))
    })

    app.get('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.getById(userId)
            .then(user => res.json(user))
    })
    
    app.delete('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.end(`user ${userId} Deleted `))
    })

    app.post('/users', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => {
                res.json(user)
            })
    })

    app.put('/users/:userId', (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })

}

module.exports = addUserRoutes


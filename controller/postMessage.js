const Message = require('../model/message.js')


exports.postmassage = function (req, res, next) {
    const name = req.body.name
    const content = req.body.content

    if(content === '') return res.status(422).send({ error: 'You must post a non-empty message' })

    const message = new Message({
        name: name,
        content: content
    })

    message.save((err) => {
        if (err) { return next(err) }
        res.json({ response: 'successfully post a message'})
    })
}


exports.getmassage = function (req, res, next) {
    Message.find({},  function(err, message) {
        if(err) return next(err)
        res.send(message)
    })
}




// exports.signup = function (req, res, next) {
//     const email = req.body.email
//     const password = req.body.password

//     if (!email || !password) { return res.status(422).send({ error: 'You must provide a valid email and password' }) }

//     User.findOne({ email: email }, (err, existingUser) => {
//         if (err) { return next(err) }

//         if (existingUser) { return res.status(422).send({ error: 'Email is in use' }) }

//         const user = new User({
//             email: email,
//             password: password
//         })

//         user.save((err) => {
//             if (err) { return next(err) }

//             res.json({ token: tokenForUser(user) })
//         })
//     })
// }


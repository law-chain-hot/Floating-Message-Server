const Message = require('../model/message.js')


exports.postmassage = function (req, res, next) {
    const name = req.body.name
    const content = req.body.content

    if(content === '' || name === '') return res.status(422).send({ error: 'You must post a non-empty message' })

    const message = new Message({
        name: name,
        content: content,
        like: 0
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

exports.like = function (req, res, next) {
    const id = req.body.id
    const like = (parseInt(req.body.like) + 1).toString()
    console.log("exports.like -> like", like)

    Message.findOneAndUpdate({_id : id}, {like: like}, function(err, message) {
        console.log("exports.like -> message", message)
        if(err) return next(err)
        res.json({ response: 'successfully add one like'})
    })
}



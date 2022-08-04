var express = require('express')
var cors = require('cors')
var app = express()
var mongoose = require('mongoose')
var firstSchema = require('./schema.js')
app.use(express.json())
app.use(cors())

let url = 'mongodb+srv://Vivek_Kumar_Singh:vivek@cluster0.ad8mjd3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url)
    .then((res => console.log('connected')))
    .catch((err => console.log(err)))

app.post('/users', async function(req, res) {
    try {
        if (req.body.name == undefined) {
            res.status(400).json({ errorMessage: "Please provide name for the user." })
            res.end()
        }
        let user = new firstSchema(req.body)
        await user.save()
        res.status(201).json({
            user
        })
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

app.get('/users', async function(req, res) {
    try {
        let users = await firstSchema.find()
        res.send(users)
    } catch (err) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

app.get('/users/:id', async function(req, res) {
    try {
        let user = await firstSchema.find({ prograd_id: req.params.id })
        if (user)
            res.send(user)
        else
            res.status(404).json({ message: "The user with the specified ID does not exist." })
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        console.log(err);
    }
})

app.delete('/users/:id', async function(req, res) {
    try {
        let user = await firstSchema.find({ prograd_id: req.params.id })
        if (user) {
            await firstSchema.deleteOne({ Prograd_id: req.params.id })
            res.json({
                message: 'Record Deleted',
                user
            })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

app.put('/users/:id', async function(req, res) {
    try {
        if (req.body.name == undefined) res.status(400).json({ errorMessage: "Please provide name for the user." })
        let user = await firstSchema.find({ prograd_id: req.params.id })
        if (user) {
            await firstSchema.updateOne({ prograd_id: req.params.id }, { $set: { prograd_id: req.body.prograd_id } })
            user = await firstSchema.find({ prograd_id: req.body.prograd_id })
            res.status(200).json({ user })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
        console.log(err);
    }
})

app.listen(3000, console.log('server started on port 3000'))
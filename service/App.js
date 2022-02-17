import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { Deck } from './models/Deck.js'
import { User } from './models/User.js'

const app = express()
const port = 8000

// CONNECT TO MongoDB  
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@brandocluster.looea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
try {
    await mongoose.connect(connectionString)
} catch (err) {
    console.log('error ', err)
}

// MIDDLEWARE
const exampleMiddleware = (req, res, next) => {
    console.log('example middleware')
    next()
}

app.use(cors())
app.use(express.json())
app.use(exampleMiddleware)

// ROUTES
// get - all cards for a deck (still needs pagination)
app.get('/decks/:id/cards', async (req, res) => {
    const limit = req.query.limit
    const deck = await Deck.findById(req.params.id)
    if (deck) { 
        res.send(deck.cards.slice(0, 5))
    } else {
        res.sendStatus(404)
    }
})

// get - an individual card by ID
const cardsById = async (req, res) => {
    const card = await Deck.findOne({
        'cards._id': req.params.id
    })
    res.status(200).send(card)
}

app.get('/cards/:id', cardsById)

// get - a deck by ID
const deckById = (req, res) => {

}

app.get('/deck/:id', deckById) 

// get - a deck by User
const deckByUser = (req, res) => {

}

app.get('deck/user')

// POST 
// post - create a deck
app.post('/deck', (req, res) => {

})

// post - create a card
app.post('/cards', async (req, res) => {
    const cardRequest = req.body
    console.log('request body ', cardRequest)
    if (cardRequest.deckId) {
        try {
            const deck = await Deck.findById(cardRequest.deckId)
            if (deck) {
                deck.cards.push({
                    frontImage: cardRequest.frontImage,
                    frontText: cardRequest.frontText,
                    backImage: cardRequest.backImage,
                    backText: cardRequest.backText
                })
                await deck.save()
                res.sendStatus(204)
            } else {
                res.sendStatus(502)
            }
        } catch {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(400)
    }
})

// post - create a user
app.post('/user', (req, res) => {

}) 

// PUTS
// put - card update
app.put('/cards', (req, res) => {

})

// put - deck update
app.put('/deck', (req, res) => {

})

// put - user update
app.put('/user', (req, res) => {

})

// DELETE
// delete - card from deck
app.delete('/cards', (req, res) => {

})

// delete - a deck
app.delete('/deck', (req, res) => {

})

// delete - a user
app.delete('/user', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })

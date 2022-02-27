import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { Deck } from './models/Deck.js'
import { User } from './models/User.js'

const app = express()
const port = 8000

// CONNECT TO MongoDB  
const connectionString = 
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@brandocluster.looea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
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
// get - all cards for a deck
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
    const oneCard = card.cards.id(req.params.id)
          res.status(200);
          res.send(oneCard)
  }
  
  app.get('/cards/:id', cardsById)

// get - a deck by Id
app.get('/decks/:id', async (req, res) => {
    const deck = await Deck.findById(req.params.id)
    if(deck) {
        res.status(200).send(deck)
    } else {
        res.sendStatus(404)
    }
}) 

// get - a deck by User 
app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.status(200).send(user)
    } else {
        res.sendStatus(404)
    }
}) 

// POST 
// post - create a deck
app.post('/deck', async (req, res) => {
    console.log('request body ', req)
    if (!req.body) {
        res.status(500)
    } else {
        const deck = req.body
        try {
            const response = await Deck.create(deck)
            res.status(200)
            res.send(response)
        } catch (error) {
            console.log(error)
            res.status(400)
        }
    }
})

// post - create a card
app.post('/cards', async (req, res) => {
    const cardRequest = req.body
    console.log('request body ', cardRequest)
    if (cardRequest.deckId) {
        try {
            const deck = await Deck.create(cardRequest.deckId)
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
app.post('/createUser', async (req, res) => {
    console.log('request body ', req.body)
    if(!req.body) {
        res.status(500)
    } else {
        const user = req.body 
        try {
           const response = await User.create(user) 
           res.status(200)
           res.send(response)
        } catch (error) {
            res.sendStatus(400)
            res.send(error)
        }
    }
})

// PUTS
// put - card update
app.put('/cards/:deck_id/:card_id', async (req, res) => {
    console.log(req.body)
    const deck = await Deck.findById(req.params.deck_id)
    if (deck !== null) {
        const matchingCardArray = deck.cards.filter((card) => {
            return card._id.toString() ===  req.params.card_id
        })
        const matchingCard = matchingCardArray[0]
        matchingCard.frontImage = req.body.frontImage,
        matchingCard.frontText = req.body.frontText,
        matchingCard.backImage = req.body.backImage,
        matchingCard.backText = req.body.backText
        for(var i= 0; i < deck.cards.length; i++) {
            if (deck.cards[i]._id.toString() === matchingCard._id) {
                deck.cards[i] = matchingCard
            }
        }
        await deck.save()
        const updatedDeck = await Deck.findById(req.params.deck_id)
        res.send(updatedDeck)
    } else {
        res.send("deck does not exist with id")
    }
})

// put - deck update
app.put('/decks/:deck_id', async (req, res) => {
    console.log('request body ', req.body)
    if (!req.body) {
        res.status(500)
    } else {
        const deck = req.body
        try {
            const response = await Deck.updateOne(deck)
            res.status(200)
            res.send(response)
        } catch {
            res.sendStatus(400)
            res.send(error)
        }
    }
})

// put - user update
app.put('/user/:id', async (req, res) => {
    console.log('request body ', req.body)
    if (!req.body) {
        res.status(500)
    } else {
        const user = req.body
        try {
            const response = await User.updateOne(user)
            res.status(200)
            res.send(response)
        } catch {
            res.sendStatus(400)
            res.send(error)
        }
    }
})

// DELETE
// delete - a card
app.delete('/cards/:deck_id/:card_id', async (req, res) => {
    const deck = await Deck.findById(req.params.deck_id)
    if (deck !== null) {
        const newCardsArray = deck.cards.filter((card) => {
            return card._id.toString() !==  req.params.card_id
        })
        deck.cards = newCardsArray
        deck.size = newCardsArray.length
        await deck.save()
        const updatedDeck = await Deck.findById(req.params.deck_id)
        res.send(updatedDeck)
    } else {
        res.send("deck does not exist with id")
    }
  })


// delete - a deck
app.delete('/decks/:id', async (req, res) => {
    const deck = await Deck.deleteOne({_id:req.params.id})
    if (deck) {
        res.status(200).send(deck)
    } else {
        res.sendStatus(400)
    }
}) 

// delete - a user
app.delete('/user/:id', async (req, res) => {
    const user = await User.deleteOne({_id:req.params.id})
    if (user) {
        res.status(200).send(user)
    } else {
        res.sendStatus(400)
    }
}) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

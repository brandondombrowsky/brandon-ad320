import mongoose from 'mongoose'

// Creating a Card Schema
const CardSchema = new mongoose.Schema({
  frontImage: String,
  frontText: String,
  backImage: String,
  backText: String
})

// Creating a Deck Schema
const DeckSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema],  
  size: Number,
  userId: mongoose.Types.ObjectId
})

export const Deck = mongoose.model('Deck', DeckSchema)
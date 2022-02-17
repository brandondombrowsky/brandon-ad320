import mongoose from 'mongoose'

// Creating a User Schema
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true }, 
  userPW: { type: String, required: true },
  usersFirstName: { type: String, required: true },
  usersLastName: { type: String, required: true },
  usersEmail: { type: String, required: true, unique: true },
  deckId: { type: mongoose.Schema.Types.ObjectId }
})

export const User = mongoose.model('User', UserSchema)
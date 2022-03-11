import { Router } from 'express'
import { User } from '../models/User.js'

const usersRouter = Router()

function sanitizeUsers(users) {
    const sanitizedUsers = users.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        decks: user.decks,
        active: user.active,
        role: user.role
    }))
    return sanitizedUsers
}

const getUsers = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    const users = await User.find({})
    res.send(sanitizeUsers(users)) 
  } else {
    res.status(403).send('Forbidden')
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.user   
  const requestor = await User.findById(userId)  
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    const user = await User.findById(req.params.id)
    res.send(user) 
  } else {
    res.status(403).send('Forbidden')
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.user 
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin') {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).send(`User updated ${result}`)
  } else if (requestor.role === 'superuser' || req.params.id === userId) {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).send(`User updated ${result}`)
  } else {
    res.sendStatus(403).send('Forbidden')
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.user 
  const requestor = await User.findById(userId)
  const user = await User.findById(req.params.id)
  if (requestor.role === 'admin') {
    const result = await User.findByIdAndDelete(req.params.id)
    res.status(201).send(`User deleted ${result}`)
  } else if (requestor.role === 'superuser' && user === userId) {
    const result = await User.findByIdAndDeleste(req.params.id)
    res.status(201).send(`User deleted ${result}`)
  } else if (requestor.role === 'user' && req.params.id === userId) {
    const result = await User.findByIdAndUpdate(req.params.id, { active: false })
    res.status(201).send(`User deactivated ${result}`)
  } else {
    res.status(403).send('Forbidden')
  }
}

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUsersById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
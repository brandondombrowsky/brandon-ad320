import React, { useState } from "react"
import { Button, Stack, TextField } from "@mui/material"
import axios from 'axios'

const CreateFlashcard = ({ userId, deckId }) => {
  console.log(`[CreateFlashcard] deckId is ${deckId}`)
  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({
    'frontImage': "",
    'frontText': "",
    'backImage': "",
    'backText': ""
  })

  function validateProperty(fieldValue) {
    console.log('validating')
    const fieldValueTrimmed = fieldValue.trim()
    if (fieldValueTrimmed === '') {
      return "Cannot be blank"
    }
    return ''
  }

  const handleChange = (event) => {
    event.preventDefault()
    console.log("[CreateFlashcard] onChange ", event)
    const validationResult = validateProperty(event.target.value)
    if (validationResult === "") {
      console.log('valid')
      const currentValues = Object.assign({}, formValue);    
      currentValues[event.target.name] = event.target.value
      setFormValue(currentValues)
    } else {
      console.log('error: ')
    }
    const currentErrors = Object.assign({}, errors);
    currentErrors[event.target.name] = validationResult
    console.log('current error messages', currentErrors)
    setErrors(currentErrors)
  }
  
  const handleSubmit = async (event) => {
    console.log("[CreateFlashcard] onSubmit ", event)
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:8000/decks/${deckId}/cards`, formValue, { headers: { user: userId } })
      console.log(`[createflashcard] response submit ${response.status}`)
    } catch (err) {
      console.log(`response error ${err.status}`)
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <span>Form values: {formValue.frontText} &amp; {formValue.backText}</span>
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        onChange={handleChange}
        autoFocus
        error={errors.frontImage}
      />
      <div>{errors.frontImage}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
        onChange={handleChange}
        error={errors.frontText}
      />
      <div>{errors.frontText}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
        onChange={handleChange}
        error={errors.backImage} 
      />
      <div>{errors.backImage}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
        onChange={handleChange}
        error={errors.backText} 
      />
      <div>{errors.backText}</div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
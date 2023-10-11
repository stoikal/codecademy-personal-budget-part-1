import express from 'express'

const app = express()
const port = 3001

let nextId = 1
const envelopes = []

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/envelopes', (req, res) => {
  res.send(envelopes)
})

app.get('/envelopes/:id', (req, res) => {
  console.log(req.params)
  const id = +req.params.id
  const found = envelopes.find(item => item.id === id)

  if (found) {
    res.send(found)
  } else {
    res.status(404).send()
  }
})

app.put('/envelopes/:id', (req, res) => {
  const id = +req.params.id
  const foundIndex = envelopes.findIndex(item => item.id === id)

  if (foundIndex > -1) {
    const { title, budget } = req.body

    const updated = { ...envelopes[foundIndex] }

    if (title) updated.title = title
    if (budget) updated.budget = budget

    envelopes[foundIndex] = updated

    res.status(200).send(envelopes[foundIndex])
  } else {
    res.status(404).send()
  }
})

app.post('/envelopes', (req, res) => {
  const newEnvelope = {
    id: nextId++,
    title: req.body.title,
    budget: req.body.budget,
  }

  envelopes.push(newEnvelope)

  res.status(201).send(envelopes[envelopes.length - 1])
})

app.delete('/envelopes/:id', (req, res) => {
  const id = +req.params.id
  const foundIndex = envelopes.findIndex(item => item.id === id)

  if (foundIndex >= -1) {
    envelopes.splice(foundIndex, 1)
    res.status(204).send()
  } else {
    res.status(404).send()
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

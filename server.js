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

app.post('/envelopes', (req, res) => {
  const newEnvelope = {
    id: nextId++,
    title: req.body.title,
    budget: req.body.budget,
  }

  envelopes.push(newEnvelope)

  res.status(201).send(envelopes[envelopes.length - 1])
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

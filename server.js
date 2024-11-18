import express from 'express'

const app = express()
app.listen(3000, () => {
    console.log('servidor iniciado...')
})

app.get("/ping", (req, res) => {
    res.status(200).send('pong')
})
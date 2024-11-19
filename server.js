import express from 'express'

const posts = [
    {
        id: 1,
        descricao: "Foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gatinho dormindo",
        imagem: "https://placecats.com/sleepy/300/150"
    },
    {
        id: 3,
        descricao: "Gato brincando com bola",
        imagem: "https://placecats.com/playful/300/150"
    },
    {
        id: 4,
        descricao: "Gato curioso",
        imagem: "https://placecats.com/curious/300/150"
    },
    {
        id: 5,
        descricao: "Gatinho preto e branco",
        imagem: "https://placecats.com/blackwhite/300/150"
    },
    {
        id: 6,
        descricao: "Gatinho fofo olhando para câmera",
        imagem: "https://placecats.com/cute/300/150"
    }
]

const app = express()
app.use(express.json())
app.listen(3000, () => {
    console.log('servidor iniciado...')
})

app.get("/ping", (req, res) => {
    res.status(200).send('pong')
})

app.get("/posts", (req, res) => {
    res.status(200).json(posts)
})

function buscarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id)
    res.status(200).json(posts[index])
})
import fs from 'fs'
import { getAllPosts, createNewPost, updateNewPost } from '../models/postsModel.js'
import gerarDescricaoComGemini from '../services/geminiService.js'

export async function listPosts(req, res) {
    const posts = await getAllPosts()
    res.status(200).json(posts)
}

export async function createPost(req, res) {
    const newPost = req.body
    try {
        const postCriado = await createNewPost(newPost)
        res.status(201).json(postCriado)
    } catch(e) {
        console.error(e.message)
        res.status(500).json({"Erro": 'Falha na requisição'})
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    
    try {
        const postCriado = await createNewPost(newPost)
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(201).json(postCriado)
    } catch(e) {
        console.error(e.message)
        res.status(500).json({"Erro": 'Falha na requisição'})
    }
}

export async function updatePost(req, res) {
    const id = req.params.id
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try {
        const imagemBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imagemBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await updateNewPost(id, post)
        res.status(201).json(postCriado)
    } catch(e) {
        console.error(e.message)
        res.status(500).json({"Erro": 'Falha na requisição'})
    }
}

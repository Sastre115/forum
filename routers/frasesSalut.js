const express = require('express')
const frasesSalut = require('../models/frasesSalut')
const router = new express.Router()

router.post('/frases', async (req, res) => {
    const frase = new frasesSalut(req.body)

    try {
        await frase.save()
        res.status(201).send(frase)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/frases', async (req, res) => {
    try {
        const frases = await frasesSalut.find({})
        res.send(frases)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/frases/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const frase = await frasesSalut.findById(_id)

        if (!frase) {
            return res.status(404).send()
        }

        res.send(frase)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/frases/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['frase', 'autor']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const frase = await frasesSalut.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!frase) {
            return res.status(404).send()
        }

        res.send(frase)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/frases/:id', async (req, res) => {
    try {
        const frase = await frasesSalut.findByIdAndDelete(req.params.id)

        if (!frase) {
            res.status(404).send()
        }

        res.send(frase)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
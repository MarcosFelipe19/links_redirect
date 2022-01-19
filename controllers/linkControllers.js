const Link = require('../models/Link')

const redirect = async (req, res) => {
    let title = req.params.title

    try {

        let doc = await Link.findOneAndUpdate({ title }, { $inc: { click: 1 } })
        res.redirect(doc.url)


    } catch (erro) {
        res.send(erro)
    }
}

const addLink = async (req, res) => {

    let link = new Link(req.body)

    try {
        let doc = await link.save();
        res.redirect('/')
    } catch (erro) {
        res.render('add', { erro, body: req.body })
    }
}

const allLinks = async (req, res) => {
    try {
        let docs = await Link.find({})
        res.render('all', { links: docs })
    } catch (erro) {
        res.send(erro)
    }
}

const deleteLink = async (req, res) => {

    let id = req.params.id
    if (!id) {
        id = req.body.id
    }

    try {
        await Link.deleteOne({ _id: id })
        // res.send(id)
        res.redirect('/')
    } catch (error) {
        res.status(404).send(error)
    }
}

const loadLinks = async (req, res) => {
    let id = req.params.id
    try {
        let doc = await Link.findById(id)
        res.render('edit', { erro: false, body: doc })
    } catch (error) {
        res.status(404).send(error)
    }
}

const editLink = async (req, res) => {

    let link = {}
    link.title = req.body.title
    link.description = req.body.description
    link.url = req.body.url

    let id = req.params.id

    if (!id) {
        id = req.body.id
    }

    try {
        let doc = await Link.findByIdAndUpdate(id, link)
        res.redirect('/')
    } catch (error) {
        res.render('edit', { error, body: req.body })
    }
}


module.exports = { redirect, addLink, allLinks, deleteLink, loadLinks, editLink }
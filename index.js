require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000  
const router = require('./routes/linkRoutes')


// mongoose.connect('mongodb://localhost/blog', (error, db)=>{
//     console.log(error)
//     console.log(db)
// })

// mongoose.connect('mongodb://localhost/blog').then(db=>{
//         console.log(db)
// }).catch(erro=>{
//     console.log(erro)
// })


// let link = new Link({
//     title: "@marcosfelipe",
//     description: "link para instagram",
//     url: "https://www.instagram.com/marcos_felipemota/",
// })

mongoose.connect(process.env.MONGO_CONNECTION_URL, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Mongo connected')
    }
})
let db = mongoose.connection

app.use('/', router)

db.on('erro', ()=>{console.log('houve um erro!')})
db.once('open', ()=>{console.log('Banco carregado!')})

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'templates'))

app.listen(PORT, ()=>{
    console.log('servidor rodando')
})
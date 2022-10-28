const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'quotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('motivational-quotes').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addQuote', (request, response) => {
    db.collection('motivational-quotes').insertOne({quoteName: request.body.quoteName,
    authorName: request.body.authorName, likes: 0})
    .then(result => {
        console.log(request.body);
        console.log('Quote Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('motivational-quotes').updateOne({quoteName: request.body.quoteNameS, authorName: request.body.authorNameS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.put('/subOneLike', (request, response) => {
    db.collection('motivational-quotes').updateOne({quoteName: request.body.quoteNameS, authorName: request.body.authorNameS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS - 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Subtracted One Like')
        response.json('Like Subtracted')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteQuote', (request, response) => {
    db.collection('motivational-quotes').deleteOne({quoteName: request.body.quoteNameS})
    .then(result => {
        console.log('Quote Deleted')
        response.json('Quote Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
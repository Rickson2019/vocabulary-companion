const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const MongoClient = require('mongodb').MongoClient


app.get('/', (req, res) => res.send('Hello World!'))


app.post('/get_profile_obj', (req, res) => {
    console.log('get_profile_obj')
    user_email = req.user_email
    console.log('user_email')
    console.log(user_email)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("user")
                .findOne(
                    { email: user_email },
                )
                .then(result=>{
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
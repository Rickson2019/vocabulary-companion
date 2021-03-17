// import express
const express = require('express')
const app = express()

// POST
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
var port = process.env.PORT || 3002

// MongoDB related
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const cors = require('cors')
var MONGODB_CONNECTION_STRING = "mongodb+srv://helloworld:bcitteam28@cluster0-r8cwn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true"
// var MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

console.log(process.env.MONGODB_CONNECTION_STRING)


app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))

// 通过邮箱来获取用户信息
app.post('/get_profile_obj_by_email', (req, res) => {
    console.log('get_profile_obj_by_email')

    console.log('user_email')
    let user_email = req.user_email

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
                .then(result => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})


app.post('/get_wordlist_obj_by_name', (req, res) => {
    console.log('get_wordlist_obj_by_name')
    wordlist_name = req.wordlist_name

    console.log('wordlist_name')
    console.log(wordlist_name)

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(wordlist_name)
                .find()
                .toArray((err, result) => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})

app.post('/update_word_info_by_wordname', (req, res) => {
    console.log('update_word_info_by_wordname(ID)')
    wordlist_name = req.word_id

    console.log('wordlist_name')
    console.log(wordlist_name)

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(wordlist_name)
                .find()
                .toArray((err, result) => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})

// 查找整个数据库的所有内容
app.get('/return_all_the_unit_names', (req, res) => {
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("wordlist_indices")
                .findOne()
                .then(result => {
                    console.log(result)
                    res.send(result)
                    res.end()
                })
        })
})

app.post('/get_word_list_by_list_name', (req, res) => {
    console.log("get_word_list_by_list_name")
    console.log(req.body)
    let list_name = req.body.list_name
    console.log(list_name)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(list_name)
                .find()
                .toArray((err, doc) => {
                    console.log(doc)
                    res.send(doc)
                })
        })
})

// Get All Languages
app.get('/get_all_language_names', (req, res) => {
    console.log("get_word_list_by_list_name")
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");

            dbo.collection("wordlist_indices")
                .findOne()
                .then(result => {
                    console.log(result.languages_in_app)
                    res.send(result.languages_in_app)
                    res.end()
                })
        })
})

app.get('/test', (req, res) => {
    console.log("get_word_list_by_list_name")
    console.log(req.body)
    let list_name = req.body.list_name
    console.log(list_name)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("german_wordlist_A2")
                .find({}).toArray((err, doc) => {
                    console.log(err)
                    console.log(doc)
                })
        })
})

app.post('/update_word_information_by_word_id', (req, res) => {
    console.log("update_word_information_by_word_id")
    console.log(req.body)
    let wordlist_name = req.body.wordlist_name
    let obj = req.body.obj
    let word_id = req.body.obj.id

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(wordlist_name)
                .updateOne(
                    { id: word_id },
                    { $set: obj },
                    { upsert: true }
                )
                .then(() => {
                    res.send('Successfully updated')
                    res.end()
                })
        })

})

app.post('/fetch_user_study_record_by_email', (req, res) => {
    console.log('fetch_user_study_record_by_email');
    console.log(req.body);
    user_email = req.body.user_email;
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection('users')
                .findOne(
                    { email: user_email }
                )
                .then((result) => {
                    res.send(result.study_record)
                    res.end()
                })
        })

})

// update_user_study_record_by_email
app.post('/update_user_study_record_by_email', (req, res) => {
    console.log('update_user_study_record_by_email');
    console.log(req.body);
    user_email = req.body.user_email;
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection('users')
                .findOne(
                    { email: user_email }
                )
                .then((result) => {
                    res.send(result.study_record)
                    res.end()
                })
        })

})

app.post('/create_word_list', (req, res) => {
    console.log('create_word_list');

    console.log('creator: ')
    console.log(req.body.user_email)
    let user_email = req.body.user_email;
    console.log('creator: ')
    console.log(req.body.wordlist_name)
    let wordlist_name = req.body.wordlist_name;

    let language = req.body.language;
    console.log(language)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.createCollection(wordlist_name);
            dbo.collection('wordlist_indices')
                .updateOne(
                    { _id: ObjectId('5f5ed3238b182bea4776b4b6') },
                    { $push: { [language]: wordlist_name } }
                )
                .then(() => {
                    res.send('creation successful')
                })
        })

})

app.post('/upDateDailyGoal', (req, res) => {
    console.log('upDateDailyGoal');
    console.log('req.body')
    console.log(req.body)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
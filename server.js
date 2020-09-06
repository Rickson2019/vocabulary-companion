const express = require('express')
const app = express()
const port = process.env.PORT || 3002

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/get_profile_obj',(req,res) => {
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const connectToMongo=require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

//if we want to access the body of the request then we need to use a middleware
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

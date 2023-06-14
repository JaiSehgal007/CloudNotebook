const connectToMongo=require('./db');
const express = require('express')
const cors=require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

//if we want to access the body of the request then we need to use a middleware
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Cloud Notes backend is listening on port ${port}`)
})

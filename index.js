const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const mongoose  = require('mongoose');
require('dotenv').config()

//Middleware
app.use(cors());
app.use(express.json());

//Mongodb connection
mongoose
.connect(`mongodb+srv://${process.env.MONGO_EMAIL}:${process.env.MONGO_PASS}@hazem-ari-db.go7pz.mongodb.net/clints-data?retryWrites=true&w=majority&appName=hazem-ari-db`)
.then(
  console.log("mongoDB connect successfully!")
)
.catch((error)=>console.log("error in mongo DB",error))

// Import router here
const userRoutes = require('./api/routes/userRoutes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Mongo connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Mongodb connected !'))
    .catch(err => console.log(err));

// Avoid console warning when we use 'unique' property in the Schema  
mongoose.set('useCreateIndex', true);

// BodyParser Middleware
app.use(express.json());

// Users routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello Worlddd !')
});

// LISTENING SERVER
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
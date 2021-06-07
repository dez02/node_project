const express = require('express');
const app = express()
// const port = 3000 || PORT;
const parkings = require('./parkings.json')

// Middleware
app.use(express.json())

//GET parkings
app.get('/parkings', (req, res) => {
    console.log('reqqq', req.params)
    res.status(200).json(parkings);
});

//GET a specific parking
app.get('/parkings/:parkingId', (req,res) => {

    //Récupération de l'id passé en paramètre dans la requête
    const parkingId = parseInt(req.params.parkingId)

    //On va chercher dans le fichier parkings.json importé le parking qui a l'id correspondant à celui passé en paramètre(parkingId)
    const parking = parkings.find(parking => parking.id === parkingId)

    res.status(200).json(parking);
});

// POST a parking
app.post('/parkings', (req, res) => {
    parkings.push(req.body);
    res.status(200).json(parkings);
});

//UPDATE a parking
app.put('/parkings/:parkingId', (req, res) => {
    const parkingId = parseInt(req.params.parkingId);
    let parking = parkings.find(parking => parking.id === parkingId);
    parking.name = req.body.name,
    parking.type = req.body.typz,
    parking.city = req.body.city

    res.status(200).json(parking);
});

//DELETE a parking

app.delete('/parking/:parkingId', (req, res) => {
    const parkingId = parseInt(req.params.parkingId);
    let parking = parkings.find(parking => parking.id === parkingId);
    parkings.splice(parkings.indexOf(parking),1);
    res.status(200).json(parkings); 
});

app.listen(3000, () => console.log('Server à l\'écoute'));
const express = require('express');
const path = require('path');
const app = express();
const hospitalUnitService = require('./services/hospital_unit_service');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/units/', (req, res) => {
    hospitalUnitService.getHostpitalUnits()
        .then((hospitalUnits) => {
             res.json(hospitalUnits);
        })
        .catch((error) => res.error(error));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Application listening on ${port}`);

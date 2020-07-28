require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');


const controller = require('../database/controller/controller.js')

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello Foo!')
});

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan('combined'));

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

const yelp = require('yelp-fusion');

const API_KEY = process.env.YELP_API;
const client = yelp.client(API_KEY);

app.get('/food', (req, res) => {
    //later set radius for search
    let location = req.query.location;
    let locObj = JSON.parse(location);
    // let businessArr = [];
    console.log(locObj);
    // client.business("tonys-pizza-napoletana-san-francisco")
        // {
        // term: req.query.search,
        // location: locObj.latitude + ', ' + locObj.longitude,
        // location: 'san francisco, ca',
        // sort_by: 'distance',
    // }
    // )
    // .then(response => {
    //     let resp = response.jsonBody;
    //     console.log(resp);
    //     // businessArr.push(resp);
    //     controller.add(resp, (err, data) => {
    //         if (err) {
    //             res.status(404).send(err)
    //         } else {
    //             res.status(201).send(data);
    //         }
    //     });
    // })
    // .catch(e => console.log(e));
    controller.getPhotos(req.query.search, (err, data) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})

app.patch('/user', (req, res) => {
    console.log(req.body);
    const query = { choice: req.body.choice, username: req.body.user };
    controller.findAndVote(query, 1, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });


const mongoose = require('mongoose');
const db = require('../index.js');

const restaurantSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        unique: true,
    },
    name: String,
    address: String,
    city: String,
    zipCode: String,
    phoneNumber: String,
    imageUrl : [String],
    photos: [
        String,
    ],
    reviews: Number,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    pickHistory: 
        {
            choice: String,
            vote: Number,
        },
    count: Number,
});

const photoSchema = new mongoose.Schema({
    photo_id: {
        type: String,
        unique: true,
    },
    business_id: String,
    caption: String,
    label: String,
});

const Photos = mongoose.model('Photos', photoSchema);
const Restaurants = mongoose.model('Restaurants', restaurantSchema);
const Users = mongoose.model('Users', userSchema);

module.exports = {
    Restaurants: Restaurants,
    Users: Users,
    Photos: Photos,
};
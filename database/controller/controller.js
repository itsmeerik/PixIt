const model = require('../model/model.js');

exports.getAll = (req, res) => {
    model.Restaurants.find({}, (err, data) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(data);
        }
    })
}

exports.add = (query) => {
    if (query.length > 1) {
        query.forEach(restaurant => {
            model.Restaurants.create({ restaurantId: restaurant.id, name: restaurant.name, address: restaurant.location.address1, city: restaurant.location.city, zipCode: restaurant.location.zip_code, phoneNumber: restaurant.display_phone, imageUrl: restaurant.image_url, photos: [restaurant.photos], reviews: restaurant.review_count });
        })
    } else {
        model.Restaurants.create({ restaurantId: query.id, name: query.name, address: query.address1, city: query.city, zipCode: query.zip_code, phoneNumber: query.display_phone, imageUrl: query.image_url, photos: query.photos, reviews: query.review_count });
    }
}

exports.getPhotos = (query, cb) => {
    // model.Photos.find({}. )
    console.log('getting photos');

    // model.Restaurants.find({ caption: { $regex: `${query}`, $options: 'i' },  }, (err, docs) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // console.log(docs);
    //         cb(null, docs);
    //     }
    // });

    model.Restaurants.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            let images = [];
            // images.push(docs.photos);
            cb(null, docs);
        }
    })
}

// const findAndVote = (filter, update, _id1, _id2, callback) => {
//     // Products.findOne(filter, callback);
//     Users.findOneAndUpdate(filter, (err, data) => {
//       const answer = data.questions.id(_id1).answers.id(_id2);
//       answer.votes += update;
//       data.save();
//     }, { new: true }, callback);
//   };
  

exports.findAndVote = (filter, update, callback) => {
    // Products.findOne(filter, callback);
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    console.log(filter);
    // model.Users.findOneAndUpdate({ username: filter.username }, { pickHistory: { choice: filter.choice, vote: 0 } }, { new: true, upsert: true, setDefaultsOnInsert: true }, (err, data) => {
    // console.log('VOTE');
    // console.log(data.pickHistory);
    // data.pickHistory.vote += 1;
    //   data.save();
    //   callback(null, data);
    // });

    model.Users.findOneAndUpdate({ username: filter.username }, { $inc: { count: 1 } }, options, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            callback(null, data);
        }
    })
  };
  
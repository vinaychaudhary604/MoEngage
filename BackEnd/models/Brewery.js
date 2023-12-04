const mongoose = require('mongoose');

const brewerySchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    website_url: String,
    state: String,
    city: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Brewery', brewerySchema);

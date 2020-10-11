const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Prefix = new Schema({
    name: {
        type: String
    },
    prefix: {
        type: String
    }
});

mongoose.model('Prefix', Prefix);
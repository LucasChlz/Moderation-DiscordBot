const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const Channel = new Schema({
    name: {
        type: String,
        required: true
    },
    id_channel: {
        type: String,
        required: true
    }
});

mongoose.model('Channel', Channel);
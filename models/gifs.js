var mongoose = require('mongoose');

var gifSchema = mongoose.Schema({
    gifUrl: String,
    likes: {type: Number, default: 0}
});

var Gif = mongoose.model('Gif', gifSchema);

module.exports = Gif;
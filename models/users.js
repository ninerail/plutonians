var mongoose = require('mongoose');



var userSchema = mongoose.Schema({
        username: String,
        email: String,
        firstName: String,
        imgUrl: String,
        bio: String,
        gifs: []
});



var User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose')
const {Schema} = mongoose;

// schema model
const userSchema = new Schema({
    bookingDate: Date,
    travelDate: Date,
    outlet: String,
    countryPhone: String,
    airPorts: String,
    flightTakeoff: String,
    doneWith: String,
    implementingCompany: String,
    costumerName: String,
    costumerPrice: Number,
    companyPrice: Number,
    profit: Number,
    DebitAccount: Number,
    comments: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// create a model instance
const User = mongoose.model('User', userSchema);

module.exports = User;
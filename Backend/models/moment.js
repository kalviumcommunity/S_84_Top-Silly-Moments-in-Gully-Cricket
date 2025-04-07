const mongoose = require('mongoose');

const MomentSchema = new mongoose.Schema({
  title: { type: String, required: true ,  minLength: [5 , 'Your title is too small']},
  location: { type: String, required: [true , 'Location needs to be mentioned' ] },
  description: { type: String, required: [true , 'Description must be mentioned with Moment']  },
  submittedBy: { type: String, required: [true , 'User  submitting needs to mention his name'] },
  createdAt: { type: Date, default: Date.now },
});

const Moment = mongoose.model('Moment' , MomentSchema);
module.exports = Moment;
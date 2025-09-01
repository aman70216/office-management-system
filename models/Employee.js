const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  position: { type: String, trim: true },               // job title
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
  location: {
    country: { type: String, default: '' },
    state:   { type: String, default: '' },
    city:    { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

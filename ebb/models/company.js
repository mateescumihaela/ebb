const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  industry: String,
  url: String,
  image: Image,
  description: String,
  size: String,
  noOfEmployees: Number,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
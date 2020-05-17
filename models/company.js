const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  industry: String,
  url: String,
  image: String,
  description: String,
  size: String,
  noOfEmployees: Number,
  user: {type: Schema.ObjectId, ref:'User'},
  author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 },
 comments: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
    }
 ],
 ratings: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Rating"
    }
 ]
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
) ;

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect("mongodb://adminErin:Tessie5567@localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
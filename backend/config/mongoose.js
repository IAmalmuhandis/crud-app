const mongoose = require ('mongoose');


mongoose.connect("mongodb+srv://almuhandis:egBK3SIRRygAouy5@mssn-auk.ztm88ss.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
// mongoose.connect('mongodb+srv://heroku_6zs6m00c:e77an6um2ngtb4q4th24b3v4g8@cluster-6zs6m00c.s2nck.mongodb.net/heroku_6zs6m00c?retryWrites=true&w=majority',{useNewUrlParser:true});

module.exports = {mongoose}

// e77an6um2ngtb4q4th24b3v4g8
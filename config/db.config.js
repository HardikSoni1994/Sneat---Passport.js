const mongoose = require('mongoose');

const URI = "mongodb://127.0.0.1:27017/Sneat_dashboard_passport";

mongoose.connect(URI)
.then(() => {
    console.log("Database is connected..");
})
.catch((error) => {
    console.log("Database is not connected..", error );
});

module.exports = mongoose;
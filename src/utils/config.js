require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    password: process.env.PASSWORD
}
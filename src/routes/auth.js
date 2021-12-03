
const authController = require('../controller/auth');

const path = '/auth';

module.exports = (server) => {
    server.post(`${path}/signin`,[authController.login]);
    server.get(`${path}/signout`,[]);
}
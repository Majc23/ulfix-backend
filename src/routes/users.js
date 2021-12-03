
const { request } = require('express');
const userController = require('../controller/users');

const path = '/api/users';

module.exports = (server) => {
    server.post(`${path}`,[userController.createUser]);
    server.get(`${path}`,[userController.getUsers]);
    server.get(`${path}/:userId`,[userController.getUser]);
    server.put(`${path}/:userId`,[userController.upDateUser]);
    server.delete(`${path}/:userId`,[userController.deleteUser]);
}
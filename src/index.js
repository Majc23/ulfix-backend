const express = require('express');
const api = express();
const userModel = require('./model/users');
const route = require('./routes/index');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const config = require('./utils/config');
const cors = require('cors');

const db = require('./utils/db')

api.use(express.urlencoded({
  extended: true
}));

api.use(express.json());

api.get('/', (req, res) => {
  res.send('Hello World!')
})

api.use(cors());
api.options('*', cors());

try {
    const adminUser = new userModel({
      name: 'admin',
      email: 'admin2@admin.com',
      password: config.password
  })
     //adminUser.save();
} catch (error) {
    //console.log(error);
}


api.use(jwt({secret: config.secret, algorithms: ['HS256'],}).unless(function(req) {
  
  return (
    req.method === "OPTIONS"||
    req.originalUrl === '/auth/signin' && req.method === 'POST' ||
    req.originalUrl === '/api/users' && req.method === 'POST'
  );
}));

route(api);

api.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.message).send()
    next()
  })

  api.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
  })

process.on('SIGINT', () => {
    console.info('SIGINT: Attempting to terminate');
    process.exit();
});

process.on('SIGTERM', () => {
    console.info('SIGTERM: Attempting to terminate');
    process.exit();
});

process.on('SIGUSR2', async () => {
    console.info('SIGUSR2: Attempting to terminate');
    process.exit(0);
});

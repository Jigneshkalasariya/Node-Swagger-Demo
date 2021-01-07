const path = require('path')
require('dotenv').config({ path: path.join('.env') })

module.exports = {
  'PORT': process.env.PORT,
  'MONGO_URI': process.env.MONGO_URI,
  'JWT_ACCESS_TOKEN_SECRET_KEY': process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  'JWT_REFRESH_TOKEN_SECRET_KEY': process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  'JWT_ACCESS_TOKEN_EXPIRE_TIME': process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  'JWT_REFRESH_TOKEN_EXPIRE_TIME': process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME
}
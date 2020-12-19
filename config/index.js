require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.port || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET
}

module.exports = config;
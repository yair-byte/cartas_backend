import dotenv from 'dotenv';

dotenv.config();

const config = {
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  HOST_DB: process.env.HOST_DB,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DATABASE_NAME: process.env.DATABASE_NAME
};

export default config;

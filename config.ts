import dotenv from 'dotenv';

dotenv.config();

const config = {
  BASE_URL: process.env.BASE_URL || `http://localhost`,
  PORT: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET
};

export default config;

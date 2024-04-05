import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  mongoDB: {
    url: process.env.MONGO_DB_URL,
    dbName: process.env.MONGO_DB_NAME
  },
  JWTSecret: process.env.JWT_SECRET,
  userRoles: ['user', 'admin', 'editor'],
  userStatuses: ['new', 'active', 'inactive'],
  admin: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  }
};

export default config;
import mongoose from 'mongoose';
import logger from '../lib/logger';
import config from '../config';

class MongooseService {
  static async init () {
    const url = config.mongoDB.url
    const db = mongoose.connection

    db.on('connected', () => {
      logger.info('connected to MongoDB')
    })
    db.on('error', (e) => {
      console.log(e)
      logger.error('MongoDB connect error')
      logger.error(e)
    })
    db.once('open', () => {
      logger.info('Mongo DB connecet')
    })

    try {
      await mongoose.connect(`${url}/${config.mongoDB.dbName}`)
    } catch (e) {
      console.log(e)
      logger.info('Mongo connection error')
      logger.error(e)
    }
  }

  static async disconnect () {
    try {
      await mongoose.disconnect()
      logger.info('Disconnected from MongoDB')
    } catch (e) {
      logger.error('MongoDB disconnection error')
      logger.error(e)
    }
  }
}

export default MongooseService

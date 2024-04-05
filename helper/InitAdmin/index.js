import config from '../../config';
import logger from '../../lib/logger';
import UserModel from '../../models/UserModel';

class InitAdmin {
  static async init() {
    try {
      const existingAdmin = await UserModel.findOne({ role: 'admin' });

      if (!existingAdmin) {
         const adminData = {
          firstName: 'Admin',
          lastName: 'Admin',
          email: config.admin.email,
          password: config.admin.password,
          role: 'admin',
          status: 'active'
        };

        const newAdmin = new UserModel(adminData);
        await newAdmin.save();

        logger.info('Admin user created successfully.');
      } else {
        logger.info('Admin user already exists.');
      }
    } catch (error) {
      logger.error('Error initializing admin:', error);
    }
  }
}

export default InitAdmin;

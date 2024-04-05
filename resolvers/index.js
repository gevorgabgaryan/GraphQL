import UserModel from "../models/UserModel";
import jwt from 'jsonwebtoken'
import config from "../config";

const resolvers = {
    Query: {
      users: async () => {
         try{
            return await UserModel.find();
         } catch(e) {
            throw e;
         }
      },
      user: async (_, {id}) => {
         try{
            return await UserModel.findOne({_id: id});
         } catch(e) {
            throw e;
         }
      },
    },

    Mutation : {
      regUser: async (_, {input}) => {
          try {
              const user = await UserModel.findOne({email: input.email});
              if (user) throw new Error('User already exists');
              const newUser = await UserModel.create({
                  firstName: input.firstName,
                  lastName: input.lastName,
                  email: input.email,
                  role: 'user',
                  status: "active",
                  password: input.password
              })

              newUser.id = newUser._id;
              return newUser;
          } catch (error) {
              throw error;
          }
      },


      loginUser: async (_, { email, password }) => {
         const user = await UserModel.findOne({ email });
         if (!user) throw new Error('User not found');
         const isValid = await user.comparePassword(password);
         if (!isValid) throw new Error('Invalid password');
         const token = jwt.sign({ userId: user.id, role: user.role }, config.JWTSecret, { expiresIn: '1d' });
         return { token, user };
      },

      editUser: async (_, args, context) => {
         if (!context.user || context.user.userId !== args.id) throw new Error('Not authorized or invalid user');
         const updatedUser = await UserModel.findByIdAndUpdate(args.id, args, { new: true });
         return updatedUser;
      },

      deleteUser: async (_, { id }, context) => {
         if (!context.user || context.user.role !== 'ADMIN') throw new Error('Not authorized or not an admin');
         await UserModel.findByIdAndDelete(id);
         return 'User successfully deleted';
      },
    }
  }

export default resolvers;

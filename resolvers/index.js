import UserModel from "../models/UserModel";

const resolvers = {
    Query: {
      users: async () => {
         try{
            return await UserModel.find();
         } catch(e) {
            throw e;
         }
      },
    },

    Mutation : {
      regUser: async (arg1, args) => {
          try {
              const user = await UserModel.findOne({email: args.email});
              if (user) throw new Error('User already exists');
              const newUser = await UserModel.create({
                  firstName: args.firstName,
                  lastName: args.lastName,
                  email: args.email,
                  role: 'user',
                  status: "active",
                  password: args.password
              })

              newUser.id = newUser._id;
              return newUser;
          } catch (error) {
              throw error;
          }
      },
    }
  }

export default resolvers;

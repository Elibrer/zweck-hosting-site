const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    /*------------User------------*/

    getUsers: async (parent, args) => {
      return User.find().select("-__v");
    },
    getUser: async (parent, args) => {
      return User.findOne({ _id: args._id })
        .select("-__v")
    },

  },

  Mutation: {
    /*------------User------------*/

    addUser: async (parent, args) => {
      console.log(args);


      const user = await User.create(args);

      return user;
    },

    updateUser: async (parent, args) => {

      console.log(args);
      
        try {
          const user = await User.findByIdAndUpdate(
            { _id: args._id },
            { $set: args },
            { new: true }
          );
          return user;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
    },

    deleteUser: async (parent, args) => {
      console.log(args);
        try {
          const user = await User.findByIdAndDelete({
            _id: args._id,
          });

          console.log("USERERERERRER");
          console.log(user);
          return user;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
  },
};

module.exports = resolvers;

const { User, Video } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    /*------------User------------*/

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    getUsers: async (parent, args, context) => {
      return User.find().select("-__v");
    },
    //I need this to find a single video based on the video ID

    getUsersVideos: async (parent, args, context) => {
      if (context.user) {
        const videoData = await Video.find({ user: context.user._id }).select(
          "-__v"
        );
        return videoData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args);
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    uploadVideo: async (parent, args, context) => {
      const existingVideo = await Video.findOne({
        videoName: args.videoName,
        user: context.user._id,
      });

      console.log(existingVideo);

      if (existingVideo) {
        throw new Error("This video already exists");
      }

      if (context.user) {
        console.log(args);
        const video = await Video.create({ ...args, user: context.user._id });

        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { videos: video._id } },
          { new: true }
        );

        return { video };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkVideo: async (_, { videoName }, context) => {
      let value = true;

      const existingVideo = await Video.findOne({ videoName });

      if (existingVideo === null) {
        value = false;
        return value;
      }
      value = true;
      return value;
    },
  },
};

module.exports = resolvers;

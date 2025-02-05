import User from "../models/index.js";
import { signToken, AuthenticationError } from "../services/auth.js";

const resolvers = {
  Query: {
    user: async (_parent: any, { username }: { username: string }) => {
      return User.findOne({ username }).populate("savedBooks");
    },

    me: async (_parent: any, _args: any, context: { user?: { _id: string } }) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      console.log('ME Query - User ID:', context.user._id);
      const userData = await User.findById(context.user._id).populate('savedBooks');
      console.log('ME Query - User Data:', userData);
      return userData;
    },
  },

  Mutation: {
    createUser: async (
      _parent: any,
      { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_parent: any, { book }: { book: any }, context: { user?: { _id: string } }) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      console.log('Save Book - Input:', book);
      console.log('Save Book - User ID:', context.user._id);
      
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      ).populate('savedBooks');
      
      console.log('Save Book - Updated User:', updatedUser);
      return updatedUser;
    },
  
    deleteBook: async (
      _parent: any,
      { bookId }: { bookId: string },
      context: { user?: { _id: string } }
    ) => {
      if (!context.user) {
        throw AuthenticationError;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).populate("savedBooks");
  
      return updatedUser;
    },
  },
};
  
export default resolvers;
import { Tuser } from './user.interface';
import { User } from './user.model';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserIntoDB = async (
  email: string,
  role: string,
  payload: Partial<Tuser>,
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('user not found');
  }

  if (role !== user.role) {
    throw new Error('You have no access to update this profile');
  }

  // Check if the user is trying to change their role from 'user' to 'admin'
  // if (role === 'user' && payload.role && payload.role === 'admin') {
  //   throw new Error('You do not have permission to change your role to admin');
  // }

  const updatedUser = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new Error('Failed to update user profile');
  }

  return updatedUser;
};

export const userServices = {
  getAllUserFromDB,
  updateUserIntoDB,
};

import catchAsync from '../../Utills/catchAsync';
import sendResponse from '../../Utills/sendResponse';
import { userServices } from './user.services';

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const result = await userServices.updateUserIntoDB(email, role, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'profile updated successfully',
    data: result,
  });
});

export const userController = {
  getAllUser,
  updateUser,
};

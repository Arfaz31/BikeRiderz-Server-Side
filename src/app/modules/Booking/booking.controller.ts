import catchAsync from '../../Utills/catchAsync';
import sendResponse from '../../Utills/sendResponse';
import { BookingServices } from './booking.services';

const createRental = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await BookingServices.createRentalIntoDB(_id, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

export const BookingController = {
  createRental,
};

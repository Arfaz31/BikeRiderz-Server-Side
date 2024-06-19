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

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateAsReturnBike(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});
const getMyAllRental = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyAllRentalsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved  successfully',
    data: result,
  });
});

export const BookingController = {
  createRental,
  returnBike,
  getMyAllRental,
};

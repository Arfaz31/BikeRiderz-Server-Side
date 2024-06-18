import catchAsync from '../../Utills/catchAsync';
import sendResponse from '../../Utills/sendResponse';
import { BikeServices } from './bike.services';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.CreateBikeIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});
const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.updateBikeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};

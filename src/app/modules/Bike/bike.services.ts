import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const CreateBikeIntoDB = async (payload: TBike) => {
  const newBike = await Bike.create(payload);
  return newBike;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    { _id: id },
    {
      isAvailable: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const BikeServices = {
  CreateBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};

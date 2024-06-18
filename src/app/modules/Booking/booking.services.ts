import mongoose from 'mongoose';
import { Bike } from '../Bike/bike.model';
import { User } from '../User/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createRentalIntoDB = async (_id: string, payload: Partial<TBooking>) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const bike = await Bike.findById({ _id: payload.bikeId });
    if (!bike) {
      throw new Error('Bike data not found');
    }

    if (!bike.isAvailable) {
      throw new Error('Bike is not available for rental');
    }
    // Update bike's availability status
    bike.isAvailable = false;
    await bike.save({ session });

    payload.userId = user._id;

    const rental = await Booking.create([payload], { session });
    if (!rental.length) {
      throw new Error('Failed to create Rental');
    }

    await session.commitTransaction();
    await session.endSession();
    return rental;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const BookingServices = {
  createRentalIntoDB,
};

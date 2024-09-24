import mongoose from 'mongoose';
import { Bike } from '../Bike/bike.model';
import { User } from '../User/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createRentalIntoDB = async (_id: string, payload: TBooking) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const bike = await Bike.findById({ _id: payload.bikeId });
    if (!bike) {
      throw new Error('Bike not found');
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

const updateAsReturnBike = async (id: string) => {
  const rental = await Booking.findById({ _id: id });
  if (!rental) {
    throw new Error('Rental not found');
  }

  const bike = await Bike.findById(rental.bikeId);
  if (!bike) {
    throw new Error('Bike not found');
  }

  // Calculate the rental duration and total cost
  const startTime = new Date(rental.startTime); //JavaScript's Date constructor parses the string into a Date object,
  const returnTime = new Date(); // current time
  const durationInHours = Math.ceil(
    //Math.ceil() is used to round up to the nearest integer
    (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 - 100), //converts milliseconds to hours.
  );
  const totalCost = durationInHours * bike.pricePerHour;

  // Update rental record
  rental.returnTime = returnTime.toISOString(); //converts the current time to an ISO string format ("2024-06-10T18:00:00.000Z").
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  // Update bike's availability status
  bike.isAvailable = true;
  await bike.save();

  return rental;
};

const getAllRentalsFromDB = async () => {
  const result = await Booking.find().populate('userId bikeId');
  return result;
};

const getMyAllRentalsFromDB = async () => {
  const result = await Booking.find().populate('userId bikeId');
  return result;
};

const updateIsPaidIntoDB = async (id: string) => {
  const rental = await Booking.findById({ _id: id });
  if (!rental) {
    throw new Error('Rental not found');
  }

  const bike = await Bike.findById(rental.bikeId);
  if (!bike) {
    throw new Error('Bike not found');
  }

  rental.isPaid = true;
  await rental.save();

  // Update bike's availability status
  bike.isAvailable = true;
  await bike.save();

  return rental;
};

export const BookingServices = {
  createRentalIntoDB,
  updateAsReturnBike,
  getAllRentalsFromDB,
  getMyAllRentalsFromDB,
  updateIsPaidIntoDB,
};

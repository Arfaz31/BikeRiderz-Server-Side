import express from 'express';
import { USER_Role } from '../User/user.constants';
import { auth } from '../../MiddleWare/auth';
import validateRequest from '../../MiddleWare/validateRequest';
import { createBookingValidationSchema } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_Role.user, USER_Role.admin),
  validateRequest(createBookingValidationSchema),
  BookingController.createRental,
);

router.put('/:id/return', auth(USER_Role.admin), BookingController.returnBike);
router.get(
  '/',
  auth(USER_Role.user, USER_Role.admin),
  BookingController.getMyAllRental,
);
export const BookingRoutes = router;

import express from 'express';
import { auth } from '../../MiddleWare/auth';
import { userController } from './user.controller';
import { USER_Role } from './user.constants';
import validateRequest from '../../MiddleWare/validateRequest';
import { updateUserValidationSchema } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  auth(USER_Role.admin, USER_Role.user),
  userController.getAllUser,
);
router.put(
  '/me',
  auth(USER_Role.admin, USER_Role.user),
  validateRequest(updateUserValidationSchema),
  userController.updateUser,
);
export const UserRoutes = router;

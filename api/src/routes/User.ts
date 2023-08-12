import express from 'express';
import controllers from '../controllers/User';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

import Logger from '../library/Logger';
import { validateCookie } from '../middlewares/ValidateCookie';
const UserRouter = express.Router();

UserRouter.get('/', controllers.readAll);
UserRouter.get('/:userId', validateCookie(), controllers.readUser);
UserRouter.post(
  '/',
  ValidateSchema(Schemas.user.create),
  controllers.createUser
);
UserRouter.patch(
  '/:userId',
  ValidateSchema(Schemas.user.update),
  controllers.updateUser
);
UserRouter.delete('/:userId', controllers.deleteUser);

export default UserRouter;

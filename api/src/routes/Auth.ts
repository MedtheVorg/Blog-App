import express from 'express';
import { getUserByCookie, logInUser, logOutUser } from '../controllers/Auth';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';
import controllers from '../controllers/User';

const AuthRouter = express.Router();

AuthRouter.get('/', getUserByCookie);
AuthRouter.post('/logout', logOutUser);
AuthRouter.post('/login', ValidateSchema(Schemas.user.logIn), logInUser);

export default AuthRouter;

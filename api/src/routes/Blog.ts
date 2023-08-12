import express from 'express';
import Blog from '../models/Blog';
import controllers from '../controllers/Blog';
import multerMiddleware from '../middlewares/Multer';
import ValidateUser from '../middlewares/ValidateUser';

const BlogRouter = express.Router();

BlogRouter.get('/:blogId', controllers.readBlog);
BlogRouter.get('/', controllers.readAll);
BlogRouter.post(
  '/',
  ValidateUser(),
  multerMiddleware('blogImage'),
  controllers.createBlog
);
BlogRouter.patch(
  '/:blogId',
  ValidateUser(),
  multerMiddleware('blogImage'),
  controllers.updateBlog
);
BlogRouter.delete('/:blogId', ValidateUser(), controllers.deleteBlog);

export default BlogRouter;

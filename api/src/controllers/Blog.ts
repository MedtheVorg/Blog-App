import Blog from '../models/Blog';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CustomError } from '../utils/utils';
import { CustomRequest } from '../utils/CustomRequest';
import Logger from '../library/Logger';

/**
 * @method : GET
 * @description : read a blog by ID
 * @path : /blog/:blogId
 */
const readBlog = asyncHandler(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const blog = await Blog.findById({ _id: blogId });
  blog
    ? res.status(200).json({ blog, cookies: req.cookies })
    : res.status(404).json({ message: 'blog not found' });
});

/**
 * @method : GET
 * @description : read all available blogs
 * @path : /blog
 */
const readAll = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await Blog.find()
    .populate('author', 'username')
    .sort({ updatedAt: -1 });
  res.status(200).json({ blogs });
});

/**
 * @method : Post
 * @description : create a new Blog
 * @path : /blog
 */
const createBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { content, summary, title } = req.body;
  const path = req.file?.filename;
  const userId = req.userId;

  const blog = new Blog({
    title,
    summary,
    blogImage: path,
    content: content,
    author: userId,
  });
  await blog.save();
  res.status(201).json({ blog, info: req.file });
});

/**
 * @method : PATCH
 * @description : update a single blog by ID
 * @path : /blog/:blogId
 */
const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndUpdate({ _id: blogId }, req.body, {
    new: true,
  });
  if (!blog) {
    throw Error('Blog Not Found');
  }
  res.status(201).json({ blog });
});

/**
 * @method : DELETE,
 * @description : Delete a single blog by ID
 * @path : /blog/:blogId
 */
const deleteBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;
  const blog = await Blog.findById({ _id: blogId });
  if (!blog) {
    throw Error('Blog Not Found');
  } else {
    Logger.warn(blog.author);
    Logger.warn(userId);
    if (!(blog.author == userId)) {
      throw CustomError('unAuthorized Action', 403);
    }
    Logger.warn('reached');
    await Blog.deleteOne({ _id: blogId });
    res.status(201).json({ message: 'Blog Deleted' });
  }
});

const controllers = { readBlog, readAll, createBlog, updateBlog, deleteBlog };
export default controllers;

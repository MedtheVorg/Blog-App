import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../hooks/UseContextCustomHook';
import { useContext } from 'react';
import { formatISO9075 } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const BlogPage = () => {
  const { blogId } = useParams();
  const { blogs, currentUser, fetchBlogs } = useContext(AppContext);
  const navigate = useNavigate();
  const [blog] = [...blogs].filter((blog) => blog._id == blogId);
  const { author, title, content, blogImage, createdAt, updatedAt, _id } = blog;

  async function deleteBlog() {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/blog/${_id}`,
      {
        withCredentials: true,
      }
    );
    if (response?.data?.error) {
      toast.warn(response?.data?.error);
      return;
    }
    await fetchBlogs();
    toast.info('Blog Deleted Successfully !');
    navigate('/');
  }
  return (
    <motion.div
      initial={{ x: '5px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-76px)] py-4"
    >
      <div className="max-w-[1280px] mx-4 lg:mx-auto p-8   shadow-xl bg-white ">
        {currentUser && author._id == currentUser._id && (
          <div className="controllers flex items-center justify-end   gap-4 w-full mb-8 border-2 p-2">
            <Link
              className="p-2 text-white bg-green-500 font-semibold rounded-sm"
              to={`/blog/update/${_id}`}
            >
              Update
            </Link>
            <button
              className="p-2 text-white bg-red-400 font-semibold rounded-sm"
              onClick={deleteBlog}
            >
              Delete
            </button>
          </div>
        )}
        <h1 className=" text-center text-xl font-semibold  lg:text-3xl lg:px-8 ">
          {title}
        </h1>
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${blogImage}`}
          alt="blog image"
          className="h-full overflow-hidden object-cover object-center w-full my-8 aspect-video  p-4"
        />
        <div className="flex items-center justify-between font-semibold text-gray-800 my-4 flex-wrap  text-xl">
          <p>created at : {formatISO9075(new Date(createdAt))}</p>
          <p>by : {author.username}</p>
        </div>
        <div
          className="tracking-wide leading-7 "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.div>
  );
};
export default BlogPage;

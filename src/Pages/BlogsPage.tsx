import Blog from '../Components/Blog';
import SearchInput from '../Components/SearchInput';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../hooks/UseContextCustomHook';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { motion } from 'framer-motion';

const BlogsPage = () => {
  const { blogs, setBlogs } = useContext(AppContext);
  const [IsFetching, setIsFetching] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  let currentBlogs = [...blogs].filter((blog) => {
    return blog.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <motion.div
      initial={{ x: '5px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 max-w-[900px] mx-auto "
    >
      <div className="flex items-center justify-between border-b-2 border-gray-300 my-8 py-2">
        <h1 className=" font-semibold text-3xl">Daily Blogs</h1>
        <SearchInput value={searchValue} setValue={setSearchValue} />
      </div>
      <div className="flex flex-col gap-8 flex-wrap">
        {currentBlogs?.length > 0 ? (
          currentBlogs.map((blog) => <Blog key={blog._id} {...blog} />)
        ) : blogs.length > 0 ? (
          <p className="text-xl">No blogs found matching your search.</p>
        ) : (
          <p className="text-2xl">
            be the first to{' '}
            <Link className="underline" to={'/create'}>
              {' '}
              make a blog{' '}
            </Link>
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default BlogsPage;

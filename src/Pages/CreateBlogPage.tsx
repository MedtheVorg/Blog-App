import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Quill from '../Components/Quill';
import { AppContext } from '../hooks/UseContextCustomHook';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { motion } from 'framer-motion';
const CreateBlogPage = () => {
  const [quillValue, setQuillValue] = useState(null);
  const [img, setImg] = useState('');
  const { fetchBlogs, setBlogs } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  function loadImage(e) {
    const reader = new FileReader();

    reader.onload = function (ev) {
      const result = ev.target?.result;
      if (result?.slice(0, 10) != 'data:image') {
        toast.warn('Please provide a valid image');
        e.target.value = null;
        return;
      }
      setImg(ev.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  async function createBlog(e) {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append(
        'blogImage',
        e.target.blogImage.files[0],
        e.target.blogImage.files[0].name
      );
      formData.append('title', e.target.title.value);
      formData.append('summary', e.target.summary.value);
      formData.append('content', quillValue);
      const response = await axios.postForm(
        `${import.meta.env.VITE_API_URL}/blog`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        toast.info('Your blog was Created Successfully !');
      }
      await fetchBlogs();
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong 😟');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <motion.div
      initial={{ x: '5px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-76px)] py-2"
    >
      <div className="max-w-[1000px] mx-auto h-full flex  justify-center  p-4 ">
        <form
          className=" w-full border-2 shadow-md p-4 rounded-md  h-auto bg-white"
          onSubmit={createBlog}
        >
          <div className="form-group flex  gap-2 flex-col p-4 ">
            <label className="font-semibold text-xl" htmlFor="title">
              Image :
            </label>
            <img src={img} alt="" className=" object-cover  max-h-[200px]" />
            <input
              className=" p-2 border-2 border-gray-300"
              type="file"
              name="blogImage"
              required
              onChange={(e) => {
                loadImage(e);
              }}
            />
          </div>
          <div className="form-group flex  gap-2 flex-col p-4 ">
            <label className="font-semibold text-xl" htmlFor="title">
              Title
            </label>
            <input
              className=" p-2 border-2 border-gray-300"
              type="text"
              placeholder="Title..."
              name="title"
              required
            />
          </div>
          <div className="form-group flex  gap-2 flex-col p-4 ">
            <label className="font-semibold text-xl" htmlFor="title">
              Summary
            </label>
            <input
              className=" p-2 border-2 border-gray-300"
              type="text"
              placeholder="Summary..."
              name="summary"
              required
            />
          </div>

          <div className="form-group p-4 ">
            <Quill value={quillValue} setValue={setQuillValue} />
          </div>
          <button
            className="bg-gradient-to-bl from-[#2B75EC] to-[#2EC4DE] text-white uppercase font-semibold p-4 rounded-lg 
             transition-all hover:scale-95 w-full mx-auto inline-block"
          >
            {isLoading ? <Spinner /> : 'Post'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default CreateBlogPage;

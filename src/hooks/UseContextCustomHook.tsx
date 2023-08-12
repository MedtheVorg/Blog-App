import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext({});

const UseContextCustomHook = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [blogs, setBlogs] = useState(null);

  async function fetchUserByCookie() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
        withCredentials: true,
      });

      const user = response.data.decoded;
      setCurrentUser(user);
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function fetchBlogs() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    try {
      fetchBlogs();
      fetchUserByCookie();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        blogs,
        setBlogs,
        fetchBlogs,
      }}
    >
      {blogs ? (
        children
      ) : (
        <div className="h-screen flex items-center justify-center  bg-[#202930]">
          <span className="spinner"></span>
        </div>
      )}
    </AppContext.Provider>
  );
};
export default UseContextCustomHook;

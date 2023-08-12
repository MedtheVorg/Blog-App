import { Routes, Route, useLocation } from 'react-router-dom';
import {
  SignUpPage,
  LogInPage,
  BlogPage,
  BlogsPage,
  UserPage,
  CreateBlogPage,
  UpdateBlogPage,
  ErrorPage,
} from '../Pages';
import { AnimatePresence } from 'framer-motion';

const Main = () => {
  const location = useLocation();
  return (
    <main className="">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route index path="/" element={<BlogsPage />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/blog/update/:blogId" element={<UpdateBlogPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
};
export default Main;

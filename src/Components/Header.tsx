import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../hooks/UseContextCustomHook';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  async function logOutUser() {
    try {
      const {
        data: { cookieCleared },
      } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (cookieCleared) {
        toast.info('we hope to see you again ! 😊');
        setCurrentUser(null);
      } else {
        throw Error('Something went wrong 😟');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <header className="bg-[#222] text-white  font-bold shadow-lg overflow-hidden">
      <div className="max-w-[1280px] flex items-center justify-between mx-auto p-4 md:px-16  ">
        <Link className="text-2xl font-bold" to="/">
          Blog
        </Link>
        <nav className="md:flex-[0.5]">
          <ul className="flex items-center gap-8  w-full">
            <li className="w-full"></li>
          </ul>
        </nav>

        {/* mobile cta */}
        <div className="text-center">
          <div className="md:hidden">
            {isOpen ? (
              <MdOutlineClose
                size={31}
                role="button"
                onClick={() => setIsOpen((prev) => !prev)}
              />
            ) : (
              <FaBars
                size={30}
                role="button"
                onClick={() => setIsOpen((prev) => !prev)}
              />
            )}

            <div
              className={`absolute  z-10 top-[64px] right-0 bg-[#222]   p-8 transition-all duration-300 ${
                isOpen ? ' translate-x-[0%]' : ' translate-x-[200%]'
              }`}
            >
              <div
                className="flex flex-col  gap-4"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {currentUser ? (
                  <>
                    <Link
                      className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                      to={'/create'}
                    >
                      Create blog
                    </Link>

                    {/* <Link
                      className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                      to={`/user/${currentUser._id}`}
                    >
                      {currentUser.username}
                    </Link> */}
                    <Link
                      className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                      to={'/'}
                      onClick={logOutUser}
                    >
                      Log Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                      to={'/signup'}
                    >
                      Sign Up
                    </Link>
                    <Link
                      className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                      to={'/login'}
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link
                  className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                  to={'/create'}
                >
                  Create blog
                </Link>
                {/* <Link
                  className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                  to={`/user/${currentUser._id}`}
                >
                  {currentUser.username}
                </Link> */}
                <Link
                  className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                  to={'/'}
                  onClick={logOutUser}
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4  ">
                <Link
                  className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                  to={'/signup'}
                >
                  Sign Up
                </Link>
                <Link
                  className="border-2 border-white py-2 px-4 hover:text-[#1F2937] hover:bg-white transition-colors font-semibold"
                  to={'/login'}
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

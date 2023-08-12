import { useContext, useState } from 'react';
import FormInput from '../Components/FormInput';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../hooks/UseContextCustomHook';
import { motion } from 'framer-motion';

const LogInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { setCurrentUser } = useContext(AppContext);

  const navigate = useNavigate();
  const formInputs: object = [
    {
      id: 1,
      type: 'email',
      name: 'email',
      placeholder: 'Enter your Email...',
      label: 'Email',
      required: true,
    },
    {
      id: 2,
      type: 'password',
      name: 'password',
      placeholder: 'Enter your Password...',
      label: 'Password',
      required: true,
    },
  ];

  function handleFormInputChanged(e: FormEvent) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function logInUser(e: any) {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formValues,
        {
          withCredentials: true,
        }
      );
      const {
        data: { error, user },
      } = response;
      if (error) {
        return toast.error(error);
      }
      // Log user
      console.log(response);

      setCurrentUser(user);
      toast.success(`Welcome , ${user.username}`);

      navigate('/');
    } catch (error) {
      toast.error(error.message);
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
      className=" flex items-center justify-center px-4  h-[calc(100vh-64px)] md:h-[calc(100vh-76px)]"
    >
      {/* form */}
      <form
        className="bg-white p-8 max-w-[500px] w-full shadow-2xl rounded-lg ring-1 ring-blu"
        onSubmit={(e) => logInUser(e)}
      >
        <h1 className="text-4xl font-semibold text-center">Log In</h1>
        <p className="my-4 text-center text-gray-400">
          Log in to your account using your credentials
        </p>
        <div className="flex flex-col gap-8 mt-8">
          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              value={formValues[input.name]}
              onChange={(e: FormEvent) => handleFormInputChanged(e)}
              {...input}
            />
          ))}

          <button
            className="bg-gradient-to-bl from-[#2B75EC] to-[#2EC4DE] text-white uppercase font-semibold py-4 inline-block w-[50%] mx-auto rounded-lg 
          transition-all hover:scale-95 "
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default LogInPage;

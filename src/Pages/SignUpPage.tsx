import { FormEvent } from 'react';
import FormInput from '../Components/FormInput';
import { useState } from 'react';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  function handleFormInputChanged(e: FormEvent) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleFormSubmit(e: FormEvent) {
    try {
      setIsLoading(true);
      e.preventDefault();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        formValues
      );
      if (data.error) {
        toast.error(data.error);

        return;
      }
      console.log(data);

      toast.success('User Created Successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const formInputs: object = [
    {
      id: 1,
      type: 'text',
      name: 'username',
      placeholder: 'Enter your Username...',
      label: 'User Name',
      required: true,
      pattern: '^[a-zA-Z0-9]{8,16}$',
      errorMessage:
        "username should be 8-16 characters and shouldn't include any special characters.",
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      placeholder: 'Enter your Email...',
      label: 'Email',
      required: true,
      pattern:
        '^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$',
      errorMessage: 'Email should be a valid email.',
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      placeholder: 'Enter your Password...',
      label: 'Password',
      required: true,
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,20}$',
      errorMessage:
        'Password must be 8-20 characters long and include 1 letter, 1 number and 1 special character.',
    },
  ];

  return (
    <motion.div
      initial={{ x: '5px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center px-4 h-[calc(100vh-64px)] md:h-[calc(100vh-76px)]"
    >
      {/* form */}
      <form
        className="bg-white p-8 max-w-[500px] w-full shadow-2xl rounded-lg ring-1 ring-blu"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
        <p className="my-4 text-center text-gray-400">
          please fill the form below to create an account
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
            transition-all hover:scale-95"
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default SignUpPage;

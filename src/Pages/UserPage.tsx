import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('inside fetch user use effect');

    async function fetchUser() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
        navigate('/');
      }
      setUser(response.data.user);
    }

    fetchUser();
  }, [userId]);
  return <div>{user ? <pre>{JSON.stringify(user)}</pre> : ''}</div>;
};
export default UserPage;

// Import Components
import Header from './Components/Header';
import Main from './Components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseContextCustomHook from './hooks/UseContextCustomHook.tsx';
function App() {
  return (
    <UseContextCustomHook>
      <Header />
      <Main />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UseContextCustomHook>
  );
}

export default App;

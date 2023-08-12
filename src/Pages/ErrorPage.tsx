import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-8">
      <h1 className="text-5xl lg:text-8xl text-center">
        Page Not Found <br /> 404
      </h1>
      <Link to={'/'} className="text-4xl underline">
        Go Home
      </Link>
    </div>
  );
};
export default ErrorPage;

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="my-10 flex flex-col items-center justify-center space-y-10">
      <h1 className=" text-5xl">404 Page Not Found</h1>
      <div className="flex items-center justify-center space-x-5">
        <Link to="/dashboard">
          <p>Back To Home Page</p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

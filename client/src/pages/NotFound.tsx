import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h1>Oops, Page not Found!</h1>
      <Link to="/dashboard" className="text-center">
        Go Back
      </Link>
    </main>
  );
};

export default NotFound;

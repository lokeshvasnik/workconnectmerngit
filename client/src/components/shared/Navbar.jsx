import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutHandler = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className="border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex space-x-4 md:order-2 md:space-x-5 rtl:space-x-reverse">
          {userData.token ? (
            <button
              type="button"
              className="text-medium rounded-full bg-[#FFDD00] p-4 px-6 text-center text-sm font-bold text-black"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <div className="hidden md:block md:space-x-5">
              <Link to="/login">
                <button
                  type="button"
                  className="text-medium rounded-full bg-[#FFDD00] p-4 px-6 text-center text-sm font-bold text-black"
                >
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="text-medium rounded-full bg-[#FFDD00] p-4 px-6 text-center text-sm font-bold text-black"
                >
                  Sign up
                </button>
              </Link>
            </div>
          )}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <Link to="/" className="md:hidden">
            <img
              className="w-72"
              src="./workconnect_logo.png"
              alt="WorkConnect Logo"
            />
          </Link>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:flex-grow md:items-center md:justify-between`}
          id="navbar-cta"
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
            {userData.token ? (
              ""
            ) : (
              <>
                <Link to="/" className="hidden md:block">
                  <img
                    className="w-72"
                    src="./workconnect_logo.png"
                    alt="WorkConnect Logo"
                  />
                </Link>

                <div className="space-x-5 md:hidden">
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-medium rounded-full bg-[#FFDD00] p-4 px-6 text-center text-sm font-bold text-black"
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      type="button"
                      className="text-medium rounded-full bg-[#FFDD00] p-4 px-6 text-center text-sm font-bold text-black"
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

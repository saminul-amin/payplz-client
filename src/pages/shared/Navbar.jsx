import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, userLogOut } = useAuth();

  const handleLogOut = () => {
    userLogOut().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are successfully Logged Out!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user && user?.email ? (
        <>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            PayPlz
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end justify-end">
          <a
            className="btn"
            href="https://github.com/saminul-amin?tab=repositories"
          >
            Join As Developer
          </a>
          {/* <Link className="btn">Register</Link> */}
        </div>
      </div>
    </div>
  );
}

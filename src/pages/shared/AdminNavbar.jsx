import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminNavbar() {
  const { user } = useAuth();

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-200 rounded-b-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            ></div>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            PayPlz
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="profile">
            <div className="flex flex-row gap-6 items-center">
              <p className="text-lg">Coins</p>
              <p className="text-lg">{user.displayName}</p>
              <img
                src={user.photoURL}
                className="mr-4 w-12 h-12 rounded-full border-2"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

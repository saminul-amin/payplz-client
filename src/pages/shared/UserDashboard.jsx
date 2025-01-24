import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

export default function UserDashboard() {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;
  const role = useRole();

  return (
    <div>
      <div className="flex flex-col gap-8 justify-between items-center">
        <img src={photoURL} className="mt-24 w-48 h-48 rounded-full border-2" />
        <h2 className="font-semibold text-3xl">
          {displayName} <span className="text-base font-normal">({role})</span>
        </h2>
        <p className="italic text-lg">{email}</p>
        <Link to="/profile">
          <button className="btn">Go To Profile</button>
        </Link>
      </div>
    </div>
  );
}

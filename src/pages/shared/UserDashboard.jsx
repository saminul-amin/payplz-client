import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();
  //   console.log(user.role);
  const { displayName, email, photoURL, role } = user;
  return (
    <div>
      <div className="flex flex-col gap-8 justify-between items-center">
        <img src={photoURL} className="mt-24 w-48 h-48 rounded-full border-2" />
        <h2 className="font-semibold text-3xl">{displayName}</h2>
        <p className="italic text-lg">{email}</p>
        {/* <p>{role}</p> */}
        <Link to="profile">
          <button className="btn">Go To Profile</button>
        </Link>
      </div>
    </div>
  );
}

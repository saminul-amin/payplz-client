import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function AdminNavbar() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  const userEmail = user.email;
  const currentUser = users.filter((usr) => usr.email === userEmail)[0];
  // console.log(currentUser);

  return (
    <div>
      <div className="navbar bg-base-200 rounded-b-xl">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            PayPlz
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex flex-row gap-6 items-center">
            {currentUser.role !== "admin" && (
              <p className="text-lg border-2 px-3 py-2 rounded-lg bg-base-300">
                Coin: {currentUser.coin}
              </p>
            )}
            <p className="text-lg">
              {user.displayName}
              <span className="text-base"> ({currentUser.role})</span>
            </p>
            <img
              src={user.photoURL}
              className="mr-4 w-12 h-12 rounded-full border-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

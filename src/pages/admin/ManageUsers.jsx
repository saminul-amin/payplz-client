import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";

export default function ManageUsers() {
//   const { user } = useAuth();
  const role = useRole();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);

  axiosPublic.get("/users").then((res) => {
    setUsers(res.data);
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold">Manage Users</h2>
      <div className="mt-6">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-semibold">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo URL</th>
                <th>Role</th>
                <th>Coin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.photo}</td>
                  <td>{role}</td>
                  <td>Coin</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

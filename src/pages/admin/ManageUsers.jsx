import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  // axiosSecure.get("/users").then((res) => {
  //   setUsers(res.data);
  // });

  const handleDeleteUser = (user) => {
    // console.log(id);
    if (user.role === "admin") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't delete yourself buddy!",
      });
      return ;
    }
    Swal.fire({
      title: "Do you really want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((result) => {
          // console.log(result.data.deletedCount);
          if (result.data.deletedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Has Been Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      } else if (result.isDenied) {
        Swal.fire("User Not Deleted!", "", "info");
      }
    });
  };

  const handleRoleChange = async (email, role) => {
    const res = await axiosSecure.post("/update-role", {
      email: email,
      role: role,
    });
    refetch();
    console.log(res);
  };

  return (
    <div>
      <Helmet>
        <title>Manage Users | PayPlz</title>
      </Helmet>
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
                <th>Change Role</th>
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
                  <td>{user.role}</td>
                  <td>{user.role !== "admin" ? user.coin : "inf"}</td>
                  <td>
                    {user.role === "admin" && (
                      <div className="join join-vertical">
                        <button
                          onClick={() => handleRoleChange(user.email, "worker")}
                          className="btn bg-base-300"
                        >
                          Make Worker
                        </button>
                        <button
                          onClick={() => handleRoleChange(user.email, "buyer")}
                          className="btn bg-base-300"
                        >
                          Make Buyer
                        </button>
                      </div>
                    )}
                    {user.role === "worker" && (
                      <div className="join join-vertical">
                        <button
                          onClick={() => handleRoleChange(user.email, "admin")}
                          className="btn bg-base-300"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => handleRoleChange(user.email, "buyer")}
                          className="btn bg-base-300"
                        >
                          Make Buyer
                        </button>
                      </div>
                    )}
                    {user.role === "buyer" && (
                      <div className="join join-vertical">
                        <button
                          onClick={() => handleRoleChange(user.email, "worker")}
                          className="btn bg-base-300"
                        >
                          Make Worker
                        </button>
                        <button
                          onClick={() => handleRoleChange(user.email, "admin")}
                          className="btn bg-base-300"
                        >
                          Make Admin
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn join-item text-xl bg-base-300"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

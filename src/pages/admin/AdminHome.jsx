import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function AdminHome() {
  const axiosPublic = useAxiosPublic();
  const { data: withdrawals = [], isLoading } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/withdrawals");
      return res.data;
    },
  });
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  if (isLoading || isUsersLoading) return <p>Loading...</p>;
  const pendingWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.status === "pending"
  );
  console.log(pendingWithdrawals);

  const handleApprove = (withdrawal) => {
    console.log(withdrawal);
    Swal.fire({
      title: "Do you really want to approve the withdrawal?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Withdrawal Approved!", "", "success");
        axiosPublic
          .patch(`/withdrawals/approved/${withdrawal._id}`)
          .then((result) => {
            console.log(result.data);
          });
        handleUpdateCoin(withdrawal.email, withdrawal.withdrawalCoin);
        refetch();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleUpdateCoin = async (workerEmail, coin) => {
    const res = await axiosPublic.post("/update-coin", {
      email: workerEmail,
      coin: parseInt(coin),
    });
    console.log(res);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between font-semibold text-lg xl:text-2xl">
        <p>Total Worker: 0</p>
        <p>Total Buyer: 0</p>
        <p>Total Availabe Coin: 0</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mt-12">Withdrawal Requests</h2>
        <div className="mt-6">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-lg font-semibold">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Payment System</th>
                  <th>Account</th>
                  <th>Coins</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {pendingWithdrawals.map((withdrawal, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{withdrawal.name}</td>
                    <td>{withdrawal.email}</td>
                    <td>{withdrawal.paymentSystem}</td>
                    <td>{withdrawal.account}</td>
                    <td>{withdrawal.withdrawalCoin}</td>
                    <td>{withdrawal.withdrawalAmount}</td>
                    <td>{withdrawal.status}</td>
                    <td>
                      <button
                        onClick={() => handleApprove(withdrawal)}
                        className="btn"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

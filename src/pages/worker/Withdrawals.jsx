import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function Withdrawals() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: withdrawals = [], isLoading } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/withdrawals");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  const userEmail = user.email;
  const myWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.email === userEmail
  );
  // console.log(myWithdrawals);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between font-semibold text-lg xl:text-2xl">
        <p>Total Earning: 0</p>
        <p>Total Withdrawal Amount: 0</p>
        <Link to="/dashboard/withdrawal-form">
          <button className="btn">Withdrawal Form</button>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mt-12">Withdrawals</h2>
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
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myWithdrawals.map((withdrawal, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{withdrawal.name}</td>
                    <td>{withdrawal.email}</td>
                    <td>{withdrawal.paymentSystem}</td>
                    <td>{withdrawal.account}</td>
                    <td>{withdrawal.withdrawalCoin}</td>
                    <td>{withdrawal.withdrawalAmount}</td>
                    <td>{withdrawal.status}</td>
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

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const { data: payments = [], isLoading: isPaymentLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  if (isLoading || isPaymentLoading) return <p>Loading...</p>;
  const userEmail = user.email;
  const currentUser = users.filter((usr) => usr.email === userEmail)[0];

  const myPayments = payments.filter((payment) => payment.email === user.email);

  return (
    <div>
      <Helmet>
        <title>Payment History | PayPlz</title>
      </Helmet>
      <h2 className="text-3xl font-semibold">Payment History</h2>
      <div className="mt-6">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-semibold">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Coins</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myPayments.map((payment, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{currentUser.name}</td>
                  <td>{payment.email}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.date}</td>
                  <td>{payment.price}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

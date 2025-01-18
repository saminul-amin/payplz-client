import { Link } from "react-router-dom";

export default function Withdrawals() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between font-semibold text-lg xl:text-2xl">
        <p>Total Earning: 0</p>
        <Link to="/dashboard/withdrawal-form">
          <button className="btn">Withdrawal Form</button>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mt-12">Withdrawals</h2>
      </div>
    </div>
  );
}

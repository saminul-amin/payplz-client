import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { MdDoneAll } from "react-icons/md";
import { BsRocketTakeoff } from "react-icons/bs";
import { ImCoinDollar } from "react-icons/im";
import { LuHistory } from "react-icons/lu";

export default function Dashboard() {
  const isAdmin = !true;
  const isWorker = !true;
  const isBuyer = true;

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-slate-700 text-white">
        <ul className="menu p-4 text-lg">
          <li className="mb-4">
            <NavLink to="/">
              <FaArrowLeftLong />
              Go To Homepage
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-tasks">
                  <SiGoogletasks />
                  Manage Tasks
                </NavLink>
              </li>
            </>
          )}
          {isWorker && (
            <>
              <li>
                <NavLink to="/dashboard/worker-home">
                  <FaHome />
                  Worker Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/task-list">
                  <SiGoogletasks />
                  Task List
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-submissions">
                  <MdDoneAll />
                  My Submissions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/withdrawals">
                  <BsRocketTakeoff />
                  Withdrawals
                </NavLink>
              </li>
            </>
          )}
          {isBuyer && (
            <>
              <li>
                <NavLink to="/dashboard/buyer-home">
                  <FaHome />
                  Buyer Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-task">
                  <SiGoogletasks />
                  Add New Task
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-tasks">
                  <MdDoneAll />
                  My Tasks
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/purchase-coin">
                  <ImCoinDollar />
                  Purchase Coin
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <LuHistory />
                  Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

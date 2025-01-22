import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/admin/AdminHome";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageTasks from "../pages/admin/ManageTasks";
import UserDashboard from "../pages/shared/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import WorkerHome from "../pages/worker/WorkerHome";
import MySubmissions from "../pages/worker/MySubmissions";
import Withdrawals from "../pages/worker/Withdrawals";
import TaskList from "../pages/worker/TaskList";
import WithdrawalForm from "../pages/worker/WithdrawalForm";
import BuyerHome from "../pages/buyer/BuyerHome";
import AddTask from "../pages/buyer/AddTask";
import MyTasks from "../pages/buyer/MyTasks";
import PurchaseCoin from "../pages/buyer/PurchaseCoin";
import PaymentHistory from "../pages/buyer/PaymentHistory";
import UpdateTask from "../pages/buyer/UpdateTask";
import TaskDetails from "../pages/worker/TaskDetails";
import Profile from "../pages/shared/Profile";
import Payment from "../pages/payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Admin Routes
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-tasks",
        element: <ManageTasks />,
      },
      // Worker Routes
      {
        path: "worker-home",
        element: <WorkerHome />,
      },
      {
        path: "my-submissions",
        element: <MySubmissions />,
      },
      {
        path: "withdrawals",
        element: <Withdrawals />,
      },
      {
        path: "withdrawal-form",
        element: <WithdrawalForm />,
      },
      {
        path: "task-list",
        element: <TaskList />,
      },
      {
        path: "task-details",
        element: <TaskDetails />,
      },
      // Buyer Routes
      {
        path: "buyer-home",
        element: <BuyerHome />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
      {
        path: "my-tasks",
        element: <MyTasks />,
      },
      {
        path: "update-task",
        element: <UpdateTask />,
      },
      {
        path: "purchase-coin",
        element: <PurchaseCoin />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;

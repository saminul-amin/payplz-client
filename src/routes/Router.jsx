import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/error/ErrorPage";
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
import AdminRoute from "./AdminRoute";
import WorkerRoute from "./WorkerRoute";
import BuyerRoute from "./BuyerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
      // Admin Routes
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks />
          </AdminRoute>
        ),
      },
      // Worker Routes
      {
        path: "worker-home",
        element: (
          <WorkerRoute>
            <WorkerHome />
          </WorkerRoute>
        ),
      },
      {
        path: "my-submissions",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawal-form",
        element: (
          <WorkerRoute>
            <WithdrawalForm />
          </WorkerRoute>
        ),
      },
      {
        path: "task-list",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "task-details",
        element: (
          <WorkerRoute>
            <TaskDetails />
          </WorkerRoute>
        ),
      },
      // Buyer Routes
      {
        path: "buyer-home",
        element: (
          <BuyerRoute>
            <BuyerHome />
          </BuyerRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <BuyerRoute>
            <AddTask />
          </BuyerRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "update-task",
        element: (
          <BuyerRoute>
            <UpdateTask />
          </BuyerRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoin />
          </BuyerRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <BuyerRoute>
            <Payment />
          </BuyerRoute>
        ),
      },
    ],
  },
]);

export default router;

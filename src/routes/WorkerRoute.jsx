import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useWorker from "../hooks/useWorker";

const WorkerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isWorker, isWorkerLoading] = useWorker();
  const location = useLocation();

  if (loading || isWorkerLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (user && isWorker) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default WorkerRoute;

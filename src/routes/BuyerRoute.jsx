import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBuyer from "../hooks/useBuyer";

const BuyerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isBuyer, isBuyerLoading] = useBuyer();
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default BuyerRoute;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBuyer = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: isBuyer, isPending: isBuyerLoading } = useQuery({
    queryKey: [user?.email, "isBuyer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/buyer/${user.email}`);
      console.log(res.data);
      return res.data?.buyer;
    },
  });
  return [isBuyer, isBuyerLoading];
};

export default useBuyer;

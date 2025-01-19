import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useWorker = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: isWorker, isPending: isWorkerLoading } = useQuery({
    queryKey: [user?.email, "isWorker"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/worker/${user.email}`);
      // console.log(res.data);
      return res.data?.worker;
    },
  });
  return [isWorker, isWorkerLoading];
};

export default useWorker;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import WorkerCard from "../../components/WorkerCard";

export default function BestWorkers() {
  const axiosPublic = useAxiosPublic();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  const workers = users.filter((user) => user.role === "worker");
  const sortedWorkers = workers.sort((a, b) => b.coin - a.coin);
  const bestWorkers = sortedWorkers.slice(0, 6);
  console.log(bestWorkers);
  return (
    <div>
      <h2 className="text-3xl font-semibold mt-12">Best Workers</h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestWorkers.map((worker) => (
          <WorkerCard key={worker._id} worker={worker}></WorkerCard>
        ))}
      </div>
    </div>
  );
}

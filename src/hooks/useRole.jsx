// import useAdmin from "./useAdmin";
import useBuyer from "./useBuyer";
import useWorker from "./useWorker";

export default function useRole() {
//   const [isAdmin] = useAdmin();
  const [isWorker] = useWorker();
  const [isBuyer] = useBuyer();

  if (isWorker) {
    return "Worker";
  } else if (isBuyer) {
    return "Buyer";
  } else {
    return "Admin";
  }
}

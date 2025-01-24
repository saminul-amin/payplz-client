import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://payplz.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

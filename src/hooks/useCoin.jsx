import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


const useCoin = () => {
const axiosSecure = useAxiosSecure();
const { user, loading } = useAuth();

const { data: coin = 0, isLoading } = useQuery({
  queryKey: ["coin", user?.email],
  enabled: !!user && !loading,
  queryFn: async () => {
    const { data } = await axiosSecure(`/coin/${user.email}`);
    return data?.coin;
  },
});

  return  [coin, isLoading];
};

export default useCoin;

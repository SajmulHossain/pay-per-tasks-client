import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaCoins } from "react-icons/fa";

const Coin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: coin=0, isLoading } = useQuery({
    queryKey: ["coin", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/coin/${user.email}`);
      return data?.coin;
    },
  });

  if (isLoading) {
    return (
      <div className="w-12 flex flex-col">
        <div className="skeleton h-8 w-full"></div>
      </div>
    );
  }
  return (
    <p className="bg-second-color/40 px-4 py-2 btn">
      <FaCoins />
      {coin}
    </p>
  );
};

export default Coin;

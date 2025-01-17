import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const {user, loading} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data:role={}, isLoading} = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async() => {
      const {data} = await axiosSecure(`/user/role/${user?.email}`);
      return data;
    }
  })
  return [role.role, isLoading];
};

export default useRole;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: isRoleLoading, error } = useQuery({
    queryKey: [user?.email, 'userInfo'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return {
          name: res.data?.name || '',
          email: res.data?.email || '',
          mobileNumber: res.data?.mobileNumber || '',
          role: res.data?.role || 'guest',
          status: res.data?.status || '',
          balance: res.data?.balance || 0
        };
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        throw err;
      }
    },
    onError: (err) => {
      console.error("Failed to fetch user data:", err);
    }
  });

  return [data, isRoleLoading, error];
};

export default useRole;

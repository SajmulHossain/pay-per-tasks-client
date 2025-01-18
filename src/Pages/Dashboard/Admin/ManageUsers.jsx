import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserRow from "./UserRow";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [...Array(10)],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  return (
    <section className="section">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th className="text-left">User</th>
              <th>Coin</th>
              <th>Update Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {users.map((i, index) => (
                  <tr key={index}>
                    <td colSpan="4">
                      <div className="w-full">
                        <div className="skeleton my-0 w-full h-16"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {users.map((user) => (
                  <UserRow key={user._id} refetch={refetch} user={user} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;

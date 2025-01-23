import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserRow from "./UserRow";
import useAuth from "../../../hooks/useAuth";
import Heading from "../../../components/Heading";
import NoData from "../../../components/NoData";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: users = [...Array(10)],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data;
    },
  });

  return (
    <section className="section">
      <Helmet>
        <title>Manage Users || Pay Per Tasks</title>
      </Helmet>
      <Heading heading="User List" />

      {users?.length ? (
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <td></td>
                <th>User</th>
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
                      <td colSpan="5">
                        <div className="w-full">
                          <div className="skeleton my-0 w-full h-16"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {users.map((user, index) => (
                    <UserRow
                      key={user._id}
                      index={index}
                      refetch={refetch}
                      user={user}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default ManageUsers;

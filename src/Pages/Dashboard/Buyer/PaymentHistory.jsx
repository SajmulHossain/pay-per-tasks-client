import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentRow from "./PaymentRow";
import NoData from "../../../components/NoData";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {
  const {state} = useLocation();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data:payments=[...Array(10)], isLoading} = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async() => {
      const {data} = await axiosSecure(`/payments/${user?.email}`);
      return data;
    }
  })

  
  return (
    <section className="section">
      <Helmet>
        <title>Payment History || Pay Per Tasks</title>
      </Helmet>
      {payments.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-center">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {isLoading || state ? (
                <>
                  {payments.map((i, index) => (
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
                  {payments.map((payment, index) => (
                    <PaymentRow
                      key={payment._id}
                      index={index}
                      payment={payment}
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

export default PaymentHistory;
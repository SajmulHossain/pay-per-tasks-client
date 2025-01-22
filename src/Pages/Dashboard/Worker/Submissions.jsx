import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Heading from "../../../components/Heading";
import NoData from "../../../components/NoData";


const Submissions = () => {
const axiosSecure = useAxiosSecure();
const { user } = useAuth();


const {data:submissions=[...Array(10)], isLoading} = useQuery({
  queryKey: ['submissions', user?.email],
  queryFn: async() => {
    const { data } = await axiosSecure(`/submissions/${user?.email}`)
    return data;
  }
})



  
  return (
    <section className="section">
      <Heading heading='My Submissions' />
     {
      submissions?.length ?  <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Buyer Email</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {submissions.map((i, index) => (
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
                {submissions.map((submission, index) => (
                  <tr key={submission._id}>
                    <td>{index + 1}</td>
                    <td>{submission?.task_title?.slice(0, 20)}...</td>
                    <td>{submission?.buyer_email}</td>
                    <td>{submission?.amount}</td>
                    <td>
                      <span className={`${submission?.status === 'pending' ? 'bg-second-color text-white' : submission?.status === 'rejected' ? 'bg-red-600 text-white' : 'bg-main-color'} px-4 py-1 rounded capitalize`}>{submission?.status}</span>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div> : <NoData />
     }
    </section>
  );
};

export default Submissions;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";


const SubmissionDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // submission details
  const { isLoading, data: task={} } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/submission/${id}`);
      return data;
    },
  });

  console.log(task);
  return <section className="section">
    {
      isLoading ? <div className="w-full min-h-screen">
        <div className="skeleton h-screen w-full"></div>
      </div> : <div>

      </div>
    }
  </section>;
};

export default SubmissionDetails;
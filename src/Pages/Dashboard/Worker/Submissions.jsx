import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Heading from "../../../components/Heading";
import NoData from "../../../components/NoData";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const Submissions = () => {
const axiosSecure = useAxiosSecure();
const { user } = useAuth();
const [currentPage, setCurrentPage] = useState(0);


const {data: pages=0} = useQuery({
  queryKey: ['pages'],
  queryFn: async() => {
    const { data } = await axiosSecure(`/submissions/count/${user?.email}`);
    return data?.pages;
  }
})




const {data:submissions=[...Array(6)], isLoading} = useQuery({
  queryKey: ['submissions', user?.email, currentPage],
  queryFn: async() => {
    const { data } = await axiosSecure(`/submissions/${user?.email}?page=${currentPage}`)
    return data;
  }
})

const totalPages = Math.ceil(pages / 6);
const numberOfPages = [...Array(totalPages).keys()];
  
  return (
    <section className="section">
      <Helmet>
        <title>Submissions || Pay Per Tasks</title>
      </Helmet>
      <Heading heading="My Submissions" />

      {submissions?.length ? (
        <div className="overflow-x-auto">
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
                      <td>{currentPage * 6 + index + 1}</td>
                      <td>{submission?.task_title?.slice(0, 20)}...</td>
                      <td>{submission?.buyer_email}</td>
                      <td>{submission?.amount}</td>
                      <td>
                        <span
                          className={`${
                            submission?.status === "pending"
                              ? "bg-second-color text-white"
                              : submission?.status === "rejected"
                              ? "bg-red-600 text-white"
                              : "bg-main-color"
                          } px-4 py-1 rounded capitalize`}
                        >
                          {submission?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

          <div className="mt-12 flex justify-center">
            <div className="join">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="btn join-item"
              >{`<`}</button>
              {numberOfPages.map((i) => (
                <button
                  onClick={() => setCurrentPage(i)}
                  className={`join-item btn ${
                    i === currentPage ? "bg-main-color" : ""
                  }`}
                  key={i}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === numberOfPages.length - 1}
                className="btn join-item"
              >{`>`}</button>
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default Submissions;
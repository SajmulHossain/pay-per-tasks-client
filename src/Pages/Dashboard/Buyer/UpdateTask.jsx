import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DefaultLoading from "../../../components/DefaultLoading";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import CrudLoading from "../../../components/CrudLoading";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/task/${id}`);
      return data;
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["task", id],
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.put(`/task/${id}`, updatedData);

      if (data.modifiedCount) {
        toast.success("Task updated successfully!");
        navigate("/dashboard/my-tasks");
      } else {
        toast.error("Something Went Wrong!");
      }
    },
  });

  const { title, details, info } = task || {};

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const info = form.submissionInfo.value;

    if ((!title, !details, !info)) {
      return setError("Please fill all input!");
    }

    const updatedData = {
      ...task,
      title,
      details,
      info,
    };

    await mutateAsync(updatedData);
  };
  return (
    <section className="section">
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <DefaultLoading />
        </div>
      ) : (
        <div className="max-w-screen-md mx-auto">
          <form onSubmit={handleUpdateTask}>
            <h3 className="text-center pb-4 font-bold text-3xl border-b border-second-color mb-4">
              Update Task Info
            </h3>
            <div className="space-y-4">
              {error && (
                <p className="text-red-500 text-center text-lg">{error}</p>
              )}
              <div className="form-control">
                <label htmlFor="title" className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  defaultValue={title}
                  placeholder="Task Title"
                  name="title"
                  id="title"
                  className="input rounded input-bordered"
                  required
                />
              </div>{" "}
              <div className="form-control">
                <label htmlFor="submissionInfo" className="label">
                  <span className="label-text">Submission Info</span>
                </label>
                <input
                  type="text"
                  name="submissionInfo"
                  defaultValue={info}
                  id="submissionInfo"
                  placeholder="Submission Info"
                  className="input rounded input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="details" className="label">
                  <span className="label-text">Submission Details</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Submission Details"
                  id="details"
                  name="details"
                  defaultValue={details}
                  className="textarea rounded h-40 textarea-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-second-color text-white">
                  Update Task {isPending && <CrudLoading />}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default UpdateTask;

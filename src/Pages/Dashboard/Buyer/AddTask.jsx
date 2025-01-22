import { useMutation } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import swalModal from "../../../utils/sweetModal";
import CrudLoading from "../../../components/CrudLoading";
import toast from "react-hot-toast";
import uploadImg from "../../../Api/imgbb";
import useCoin from "../../../hooks/useCoin";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [completionDate, setCompletionDate] = useState(new Date());
  const [coin,,refetch] = useCoin();
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["tasks", user?.email],
    mutationFn: async ({ task, imageFile }) => {

      const { imgUrl } = await uploadImg(imageFile);
      const { data } = await axiosSecure.post("/tasks", {
        ...task,
        image: imgUrl,
      });
      if (data?.insertedId) {
        swalModal("Tasks", "Task added successfully!");
        refetch();
        navigate('/dashboard/my-tasks')
      } else {
        swalModal("Tasks", "Something went wrong", "error");
      }
    },
  });

  const changeDate = (date) => {
    setError("");
    if (
      compareAsc(new Date().toDateString(), new Date(date).toDateString()) === 1
    ) {
      return setError("You cannot set a date before today.");
    }
    setCompletionDate(date);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const title = form.title.value;
    const workers = parseInt(form.workers.value);
    const amount = parseInt(form.amount.value);
    const imageFile = form.image.files[0];
    const info = form.submissionInfo.value;
    const details = form.details.value;

    // console.table({
    //   title,
    //   workers,
    //   amount,
    //   imageFile,
    //   date: completionDate,
    //   info,
    //   details,
    // });

    if (
      !title ||
      !workers ||
      isNaN(workers) ||
      !amount ||
      isNaN(amount) ||
      !imageFile ||
      !info ||
      !details
    ) {
      return setError("Please valid value. Workers and Amount should number");
    }

    const neededTotalPayment = amount * workers;
    if (neededTotalPayment > coin) {
      return toast(`You need total ${neededTotalPayment} coins.`, {
        icon: "⚠️",
      });
    }

    const task = {
      title,
      workers,
      amount,
      date: completionDate,
      info,
      details,
      buyer: {
        email: user?.email,
        name: user?.displayName,
      },
    };

    try {
      await mutateAsync({ task, imageFile });
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <section className="section">
      <div>
        <form onSubmit={handleAddTask}>
          <h3 className="text-center font-bold text-3xl border-b border-second-color mb-4">
            Add Task
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
                placeholder="Task Title"
                name="title"
                id="title"
                className="input rounded input-bordered"
                required
              />
            </div>
            <div className="flex gap-2 items-center flex-col md:flex-row md:justify-between md:items-start">
              <div className="form-control w-full">
                <label htmlFor="workers" className="label">
                  <span className="label-text">Required Workers</span>
                </label>
                <input
                  type="workers"
                  placeholder="Required Workers"
                  name="workers"
                  id="workers"
                  className="input rounded input-bordered"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="amount" className="label">
                  <span className="label-text">Payable Amount</span>
                </label>
                <input
                  type="amount"
                  placeholder="Payable Amount"
                  name="amount"
                  id="amount"
                  className="input rounded input-bordered"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="date" className="label">
                  <span className="label-text">Completion Date</span>
                </label>
                <DatePicker
                  name="date"
                  className="input input-bordered rounded w-full"
                  dateFormat="PP"
                  id="date"
                  selected={completionDate}
                  onChange={(value) => changeDate(value)}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                placeholder="Email"
                name="image"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                className="file-input rounded text-main-color file-input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="submissionInfo" className="label">
                <span className="label-text">Submission Info</span>
              </label>
              <input
                type="text"
                name="submissionInfo"
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
                className="textarea rounded h-40 textarea-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button disabled={isPending} className="btn bg-second-color text-white">
                Add Task {isPending && <CrudLoading />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;

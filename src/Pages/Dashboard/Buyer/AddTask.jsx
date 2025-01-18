import { compareAsc } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddTask = () => {
const [error, setError] = useState('');
const [completionDate, setCompletionDate] = useState(new Date());


const changeDate = date => {
  setError('');
  if (compareAsc(new Date().toDateString(), new Date(date).toDateString()) !== 0) {
    return setError('You cannot set a date before today.')
  }
  setCompletionDate(date);
}


  const handleAddTask = e => {
    e.preventDefault();
  }
  return (
    <section className="section">
      <div>
        <form onSubmit={handleAddTask}>
          <h3 className="text-center font-bold text-3xl border-b border-second-color mb-4">Add Task</h3>
          <div className="space-y-4">
            {
              error && <p className="text-red-500 text-center text-lg">{error}</p>
            }
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
                  <span className="label-text">Completion Date</span>
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
                <label htmlFor="workers" className="label">
                  <span className="label-text">Required Workers</span>
                </label>
                <DatePicker
                  name="date"
                  className="input input-bordered rounded w-full"
                  dateFormat="PP"
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
              <input
                type="text"
                placeholder="Submission Details"
                id="details"
                name="details"
                className="input rounded input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-second-color text-white">Add Task</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
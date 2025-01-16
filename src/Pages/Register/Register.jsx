import GoogleLogin from "../../components/GoogleLogin";
import registerLottie from '../../assets/lotties/register.json'
import Lottie from "lottie-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import uploadImg from "../../Api/imgbb";
import toast from "react-hot-toast";
import { axiosSecureUrl } from "../../hooks/useAxiosSecure";


const Register = () => {
const [error, setError] = useState();
const { updateUser ,register, user} = useAuth();


if(user) {
  return <Navigate to='/dashboard' replace />
}

  const handleRegister =async e => {
    e.preventDefault();
    setError('');

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const name = form.name.value;
    const role = form.role.value;


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!emailRegex.test(email)) {
      return setError("Please give valid email");
    }

    if (password.length < 6) {
      setError("Password should be 6 character long");
    }

    if (!passwordRegex.test(password)) {
      return setError(
        "Password must contain atleast one uppercase and lowercase"
      );
    }

    if(!image) {
      return setError('Please upload your image!')
    }

    if(!role) {
      return setError('Please select your role!');
    }

const imgUrl = await uploadImg(image);

try {
  const result = await register(email, password);  
  await updateUser(name, imgUrl);

  const user = {
    email : result?.email,
    name: result?.displayName,
    image: result?.photoURL,
    role: 'role',
    timeStamp: new Date().now()
  }

  await axiosSecureUrl.post(`/user/${email}`, user)
} catch(err) {
  toast.error(err.code);
}


  }

  return (
    <section className="section max-w-screen-lg flex gap-12 items-center">
      <div className="flex-1 hidden md:block">
        <Lottie animationData={registerLottie} />
      </div>
      <div className="flex-1 shadow-2xl rounded bg-main-color/10">
        <form onSubmit={handleRegister} className="p-6 py-10">
          <h1 className="text-3xl mb-8 text-center border-b border-main-color py-2 font-bold">
            Register now!
          </h1>

          {<p className="text-center text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                className="input rounded input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                className="input rounded input-bordered"
                required
              />
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
              <label htmlFor="role" className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                defaultValue="Select Your Role"
                id="role"
                className="select select-bordered w-full"
              >
                <option disabled>Select Your Role</option>
                <option>Worker</option>
                <option>Buyer</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="input rounded input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn rounded bg-main-color hover:bg-second-color">
              Login
            </button>

            <p className="text-sm mt-1">
              {`Already have an account? `}
              <Link to="/login" className="font-medium">
                Login
              </Link>
            </p>
          </div>

          <div className="divider">or</div>

          <GoogleLogin />
        </form>
      </div>
    </section>
  );
};

export default Register;
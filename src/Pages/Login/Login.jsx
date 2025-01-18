import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/login.json";
import GoogleLogin from "../../components/GoogleLogin";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import DefaultLoading from "../../components/DefaultLoading";

const Login = () => {
  const [error, setError] = useState("");
  const { login, loading, user, setLoading } = useAuth();
  const {state} = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <DefaultLoading />
      </div>
    );
  }

  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

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

    login(email, password)
      .then(() => {
        navigate(state || '/');
        toast.success("Login Successfull");
      })
      .catch(({ code }) => {
        toast.error(code);
        setLoading(false);
      });
  };
  return (
    <section className="section w-full max-w-screen-lg md:flex md:gap-12 md:items-center overflow-x-hidden">
      <div data-aos="fade-right" className="md:flex-1 hidden md:block">
        <Lottie animationData={loginLottie} />
      </div>
      <div
        data-aos="fade-left"
        className="md:flex-1 rounded shadow-xl bg-main-color/10"
      >
        <form onSubmit={handleLogin} className="p-6 py-10">
          <h2 className="text-3xl mb-8 text-center border-b border-main-color py-2 font-bold">
            Login now!
          </h2>

          {<p className="text-center text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-y-4">
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
              {`Don't have an account? `}
              <Link to="/register" className="font-medium">
                Register
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

export default Login;

import Lottie from "lottie-react";
import loginLottie from '../../assets/lotties/login.json'
import GoogleLogin from "../../components/GoogleLogin";


const Login = () => {
  return (
    <section className="section max-w-screen-lg flex items-center">
      <div className="flex-1 hidden md:block">
        <Lottie animationData={loginLottie} />
      </div>
      <div className="flex-1 shadow-2xl rounded bg-main-color/10">
        <form className="p-6 py-10">
          <h1 className="text-3xl mb-8 text-center border-b border-main-color py-2 font-bold">
            Login now!
          </h1>
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
            <button className="btn rounded bg-main-color hover:bg-second-color">Login</button>
          </div>

          <div className="divider">or</div>

          <GoogleLogin />
        </form>
      </div>
    </section>
  );
};

export default Login;
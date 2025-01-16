import toast from "react-hot-toast";
import googleLogo from "../assets/images/googleLogo.png";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosSecureUrl } from "../hooks/useAxiosSecure";

const GoogleLogin = () => {
  const { signInWithGoogle, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (res) => {
        toast.success("Login Successfull!");
        const user = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          image: res?.user?.photoURL,
          role: "worker",
          coin: 10,
          timeStamp: res?.user?.metadata.createdAt,
        };
        navigate("/dashboard");
        await axiosSecureUrl.post(`/user/${res.user.email}`, user);
      })
      .catch(({ code }) => {
        toast.error(code);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn w-full bg-main-color/20 rounded"
      >
        <img src={googleLogo} className="w-8" alt="googleIcon" />
        Log in with google
      </button>
    </div>
  );
};

export default GoogleLogin;

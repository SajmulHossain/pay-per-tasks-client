import toast from "react-hot-toast";
import googleLogo from "../assets/images/googleLogo.png";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Login Successfull!");
        navigate("/dashboard");
      })
      .catch(({ code }) => toast.error(code));
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

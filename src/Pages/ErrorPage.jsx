import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import errorImg from '../assets/images/error.png'
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex justify-center items-center max-w-screen-xl mx-auto px-4">
      <Helmet>
        <title>Error || Food Hunter</title>
      </Helmet>
      <div className="p-4 rounded border border-green-500">
        <div>
          <img src={errorImg} className="rounded" alt="error img" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="w-full">
            <button
              onClick={() => navigate(-1)}
              className="btn w-full bg-purple-800 text-white hover:bg-purple-950 rounded hover:gap-4 transition-all duration-500"
            >
              <FaLongArrowAltLeft /> Go Back
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={() => navigate("/")}
              className="btn w-full bg-green-700 text-white hover:bg-green-950 rounded hover:gap-4 transition-all duration-500"
            >
              Go Home <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

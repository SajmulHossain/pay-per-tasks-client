import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

export const axiosSecureUrl = axios.create({
  baseURL: import.meta.env.VITE_api_url,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecureUrl.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logout();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);
};

export default useAxiosSecure;

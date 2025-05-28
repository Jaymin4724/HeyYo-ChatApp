import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

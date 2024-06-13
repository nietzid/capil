import { createContext, useState, useEffect, useContext } from "react";
import Loading from "../components/Loading.jsx";
import pb from "../lib/pocketbase.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await pb
        .collection("users")
        .authWithPassword(userInfo.email, userInfo.password)
        .then((res) => {
          console.log(res);
          setUser(res.record);
        });
      setLoading(false);
      return { error: false, message: "Login Success" };
    } catch (error) {
      setLoading(false);
      return { error: true, message: `${error.message}` };
    }
  };

  const logoutUser = async () => {
    pb.authStore.clear();
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    console.log(userInfo);

    try {
      let response = await pb.collection("users").create(userInfo);

      setLoading(false);
      return {
        error: false,
        message: "Register Success",
        data: response,
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { error: true, message: `${error.message}` };
    }
  };

  const updateUser = async (userId, userInfo) => {
    setLoading(true);
    console.log(userId, userInfo);

    try {
      let response = await pb.collection("users").update(userId, userInfo);
      setLoading(false);
      return {
        error: false,
        message: "Update Success",
        data: response,
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { error: true, message: `${error.message}` };
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    console.log(userId);

    try {
      let response = await pb.collection("users").delete(userId);
      setLoading(false);
      return {
        error: false,
        message: "Delete Success",
        data: response,
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { error: true, message: `${error.message}` };
    }
  };

  const checkUserStatus = async () => {
    try {
      setUser(pb.authStore.model);
    } catch (error) {}
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;

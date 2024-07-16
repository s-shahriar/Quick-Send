import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext({
  user: null,
  loading: true,
  createUser: () => {},
  signIn: () => {},
  logOut: () => {},
  setLoading: () => {},
});


const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);
    const res = await axiosSecure("/logout");
    setUser(null);
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
        setUser(currentUser);
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

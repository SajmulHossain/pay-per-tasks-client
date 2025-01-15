import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
}

const data = {
  signInWithGoogle
}
  

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { error } = useSelector((state) => state.user);
  const handleGoogleClick = async () => {
    try {
      setErrMsg("");
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const idToken = await result.user.getIdToken();

      console.log(idToken);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // handle if error comes up here
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        setErrMsg(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      >
        Continue with google
      </button>
      {error ? (
        <p className="text-red-700 mt-5">
          {errMsg || "Something went wrong "}{" "}
        </p>
      ) : (
        ""
      )}
    </>
  );
}

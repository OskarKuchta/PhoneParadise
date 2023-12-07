import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { app, db } from "../assets/FirebaseConfig";
import { UserData } from "../Types/Types";

const Login: FC = () => {
  const navigate = useNavigate();
  const accountCollection: CollectionReference<DocumentData> = collection(
    db,
    "accounts"
  );
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const loginAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const querySnapshot = await getDocs(
        query(accountCollection, where("email", "==", userData.email))
      );
      if (!querySnapshot.empty) {
        console.log("User exists in 'accounts' collection");
        navigate("/profile");
      } else {
        console.log("User does not exist in 'accounts' collection");
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: AuthError) => {
    console.error("Invalid credentials:", error.code, error.message);
  };
  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh] px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl">
              Sign in to your account
            </h2>
            <form
              className="space-y-4 md:space-y-6"
              autoComplete="on"
              onSubmit={loginAuth}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                  onChange={(e) =>
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-purple bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

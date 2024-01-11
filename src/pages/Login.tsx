import { Dispatch, FC, useEffect, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../assets/FirebaseConfig";
import { UserData, UserDataChceck } from "../Types/Types";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { login } from "../features/AccountSlice";
import { RootState } from "../store";
import { CheckPassword } from "../assets/icons";
import { useTranslation } from "react-i18next";

const Login: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.account.isLoggedIn
  );
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const accountCollection: CollectionReference<DocumentData> = collection(
    db,
    "accounts"
  );
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [userDataCheck, setUserDataCheck] = useState<UserDataChceck>({
    isEmailExist: true,
    isPasswordCorrect: true,
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const loginAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      accountCollection
    );

    for (const doc of querySnapshot.docs) {
      const emailInDoc: string | undefined = doc.data().email;
      const passwordInDoc: string | undefined = doc.data().password;

      if (emailInDoc === userData.email) {
        setUserDataCheck((prevState) => ({
          ...prevState,
          isEmailExist: true,
        }));
        if (passwordInDoc === userData.password) {
          dispatch(login(doc.data()));
          navigate("/profile");
          setUserDataCheck((prevState) => ({
            ...prevState,
            isEmailExist: true,
            isPasswordCorrect: true,
          }));
        } else {
          setUserDataCheck((prevState) => ({
            ...prevState,
            isPasswordCorrect: false,
          }));
        }
        return;
      }
    }
    setUserDataCheck((prevState) => ({
      ...prevState,
      isPasswordCorrect: true,
      isEmailExist: false,
    }));
  };

  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh] px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl">
              {t("sign-to-account")}
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
                  {t("your-email")}
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
                {userDataCheck.isEmailExist === false ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("email-not-exist")}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
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
                  {userData.password.length >= 1 ? (
                    <CheckPassword
                      className="absolute right-3 bottom-2"
                      togglePassword={togglePasswordVisibility}
                    />
                  ) : null}
                </div>
                {userDataCheck.isPasswordCorrect === false ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    Password is incorrect.
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full text-purple bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {t("sign-in")}
              </button>
              <p className="text-sm font-light text-gray-500 ">
                {t("account-not-created")}{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline ml-1"
                >
                  {t("sign-up")}
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

import { FC, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  CollectionReference,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import {
  PasswordVisibleRegister,
  UserData,
  UserDataError,
} from "../Types/Types";
import { db } from "../assets/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { CheckPassword } from "../assets/icons";
import { useTranslation } from "react-i18next";
const Register: FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarColor: "bg-emerald-500",
  });
  const [userDataError, setUserDataError] = useState<UserDataError>({
    name: false,
    nameTaken: false,
    emailTaken: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [passwordVisible, setPasswordVisible] =
    useState<PasswordVisibleRegister>({
      password: false,
      confirmPassword: false,
    });
  const { t } = useTranslation();
  const togglePasswordVisibility = (type: "password" | "confirmPassword") => {
    setPasswordVisible((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const accountCollection: CollectionReference<DocumentData, DocumentData> =
    collection(db, "accounts");

  const nameRegex: RegExp = /^(?=.*[A-Za-z])[A-Za-z0-9 ]+$/;
  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)/;
  const emailRegex: RegExp =
    /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*[A-Za-z][A-Za-z0-9]*@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: e.target.value,
    }));

    setUserDataError((prevErrors) => ({
      ...prevErrors,
      nameTaken: false,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: e.target.value,
    }));

    setUserDataError((prevErrors) => ({
      ...prevErrors,
      emailTaken: false,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      accountCollection
    );
    const validationErrors: string[] = [];

    querySnapshot.forEach((doc) => {
      const nameInDoc: string | undefined = doc.data().name;
      const emailInDoc: string | undefined = doc.data().email;

      if (
        nameInDoc &&
        typeof nameInDoc === "string" &&
        nameInDoc === userData.name
      ) {
        validationErrors.push("Name is already taken");

        setUserDataError((prevErrors) => ({
          ...prevErrors,
          nameTaken: true,
        }));
      }

      if (
        emailInDoc &&
        typeof emailInDoc === "string" &&
        emailInDoc === userData.email
      ) {
        validationErrors.push("Email is already taken");
        setUserDataError((prevErrors) => ({
          ...prevErrors,
          emailTaken: true,
        }));
      }
    });

    if (userData.name.length <= 4) {
      validationErrors.push("Name must be longer than 4 characters");
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        name: true,
      }));
    }

    if (!nameRegex.test(userData.name)) {
      validationErrors.push("Invalid characters in name");
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        name: true,
      }));
    }

    if (!emailRegex.test(userData.email)) {
      validationErrors.push("Invalid email format");
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
    }

    if (!passwordRegex.test(userData.password)) {
      validationErrors.push(
        "Password must contain at least one uppercase letter and one digit"
      );
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
    }

    if (userData.password !== userData.confirmPassword) {
      validationErrors.push("Both passwords are different");
      setUserDataError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: true,
      }));
    }

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => console.log(error));
      return;
    }

    setUserDataError((prevErrors) => ({
      ...prevErrors,
      name: false,
      nameTaken: false,
      email: false,
      emailTaken: false,
      password: false,
      confirmPassword: false,
    }));

    await addDoc(accountCollection, {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatarColor: userData.avatarColor,
      shopHistory: [],
    });

    navigate("/register/complete", { state: { fromRegister: true } });
  };

  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh] px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mb-28">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl">
              {t("sign-up-header")}
            </h2>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  {t("name")}
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your name"
                  required
                  autoComplete="on"
                />
                {userData.name.length <= 4 && userDataError.name ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("name-length")}
                  </p>
                ) : null}
                {!nameRegex?.test(userData.name) && userDataError.name ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("invalid-characters")}
                  </p>
                ) : null}
                {userDataError.nameTaken ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("name-taken")}
                  </p>
                ) : null}
              </div>
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
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  autoComplete="on"
                />
                {!emailRegex.test(userData.email) && userDataError.email ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("invalid-email")}
                  </p>
                ) : null}
                {userDataError.emailTaken ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("email-taken")}
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
                    type={passwordVisible.password ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        password: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    autoComplete="off"
                  />
                  {userData.password.length >= 1 ? (
                    <CheckPassword
                      className={`absolute right-3 bottom-2`}
                      togglePassword={() =>
                        togglePasswordVisibility("password")
                      }
                    />
                  ) : null}
                </div>
                {!passwordRegex.test(userData.password) &&
                userDataError.password ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("password-regex")}
                  </p>
                ) : null}
                {userData.password.length < 5 && userDataError.password ? (
                  <p className="text-[0.75rem] text-purple mt-1">
                    {t("password-length")}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  {t("confirm-password")}
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible.confirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  {userData.confirmPassword.length >= 1 ? (
                    <CheckPassword
                      className="absolute right-3 bottom-2"
                      togglePassword={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    />
                  ) : null}
                </div>
                {userData.password !== userData.confirmPassword
                  ? userDataError.confirmPassword && (
                      <p className="text-[0.75rem] text-purple mt-1">
                        {t("password-different")}
                      </p>
                    )
                  : null}
              </div>
              <button
                type="submit"
                className="w-full text-purple bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {t("sign-up")}
              </button>
              <p className="text-sm font-light text-gray-500 ">
                {t("account-exist")}{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  {t("sign-in")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;

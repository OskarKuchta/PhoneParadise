import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { UserData } from "../Types/Types";

const Register = () => {
  const navigate: NavigateFunction = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)/;
  const emailRegex: RegExp = /^[A-Za-z0-9]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/;

  console.log(userData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: string[] = [];

    if (userData.name.length <= 4) {
      validationErrors.push("Name must be longer than 4 characters");
    }

    if (!emailRegex.test(userData.email)) {
      validationErrors.push("Invalid email format");
    }

    if (userData.password !== userData.confirmPassword) {
      validationErrors.push("Both passwords are different");
    }

    if (
      !(
        passwordRegex.test(userData.password) &&
        passwordRegex.test(userData.confirmPassword)
      )
    ) {
      validationErrors.push(
        "Password must contain at least one uppercase letter and one digit."
      );
    }

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => console.log(error));
      return;
    }

    navigate("/login");
  };
  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh] px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl">
              Sign up your account
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) =>
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      name: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
                {userData.name.length <= 4 && (
                  <p className="text-[0.75rem] text-purple mt-1">
                    Name must be longer than 4 characters.
                  </p>
                )}
              </div>
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
                  onChange={(e) =>
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      email: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
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
                  onChange={(e) =>
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-purple sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-purple"
                >
                  Confirm password
                </label>
                <input
                  type="password"
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
              </div>
              <button
                type="submit"
                className="w-full text-purple bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already you have account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
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

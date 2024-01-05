import { FC } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import Expired from "../components/Expired";
const CompleteRegistration: FC = () => {
  const location: Location = useLocation();
  const fromRegister: string | undefined = location.state?.fromRegister;
  if (!fromRegister) {
    return <Expired />;
  }
  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh] px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl">
              Your account has been created.
            </h2>
          </div>
          <p className="text-sm font-light text-gray-500 mb-12 px-4">
            Thank you for creating an account. Now you can log in to your
            account.{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default CompleteRegistration;

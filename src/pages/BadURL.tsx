import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";

const BadURL = () => {
  const [count, setCount] = useState<number>(15);
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      navigate("/");
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count, navigate]);
  return (
    <main className="m-8 flex flex-col mx-[10%] text-center items-center mt-[20vh]">
      <h2 className="text-3xl my-[0.7rem]">404</h2>
      <p className="text-lg sm:text-2xl my-[0.7rem] md:w-1/2">
        {t("bad-url")} {count} {t("seconds")}
      </p>
      <Link
        to="/"
        aria-label="Back to main page"
        className="transition duration-1000 border border-purple rounded-md py-[0.3rem] px-[2rem] my-[0.7rem] hover:border-blue-700 focus:border-blue-700 hover:text-blue-700 focus:text-blue-700"
      >
        {t("back-to-main")}
      </Link>
    </main>
  );
};

export default BadURL;

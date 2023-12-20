import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router";
const Expired: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  return (
    <main className="flex flex-col justify-center items-center text-center h-[60vh] w-[80vw] mx-[10%]">
      <h2>Your link is expired. Back to main and try again.</h2>
      <button
        onClick={backToMain}
        className="mt-8 py-2 px-8 border-2 rounded border-purple transition-colors duration-500 focus:bg-purple focus:text-white focus:outline-none hover:bg-purple hover:text-white"
      >
        {" "}
        Back to main
      </button>
    </main>
  );
};

export default Expired;

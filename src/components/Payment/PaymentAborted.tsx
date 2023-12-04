import { FC } from "react";
import { useNavigate } from "react-router";
const PaymentAborted: FC = () => {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  return (
    <main className="flex flex-col justify-center items-center text-center h-[60vh] w-[80vw] mx-[10%]">
      <h2>Your link is expired. Back to cart and try again.</h2>
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

export default PaymentAborted;

import { Dispatch, FC, useState } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/LoginSlice";
import { NavigateFunction, useNavigate } from "react-router";
import { AnyAction } from "redux";

const Profile: FC = () => {
  const [isColorsPallete, setIsColorsPallete] = useState<boolean>(false);
  const storedUserData = useSelector(
    (state: RootState) => state.login.userData
  );
  console.log(storedUserData);
  const avatarColor = useSelector(
    (state: RootState) => state.login.userData.avatarColor
  );
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const logoutAccount = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh]  lg:py-0">
        <div className="w-[90vw] bg-white rounded-lg shadow md:mt-0 xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex">
              <div
                className={`border border-black w-16 h-16 rounded-full ${avatarColor} flex justify-center items-center`}
              >
                <span>{storedUserData.name.slice(0, 1)}</span>
              </div>
              <button
                className="mb-12 ml-2"
                onClick={() => setIsColorsPallete(true)}
              >
                Change color
              </button>
            </div>
            {isColorsPallete ? (
              <div className="flex items-center">
                <div className="bg-gray-200 w-60 left-[4.5rem] bottom-[0.7rem] rounded-md border border-black grid grid-cols-3 gap-2 place-items-center py-2">
                  <button className="border border-black w-10 h-10 rounded-full bg-emerald-500 flex justify-center items-center"></button>
                  <button className="border border-black w-10 h-10 rounded-full bg-pink-500 flex justify-center items-center"></button>
                  <button className="border border-black w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center"></button>
                  <button className="border border-black w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center"></button>
                  <button className="border border-black w-10 h-10 rounded-full bg-rose-500 flex justify-center items-center"></button>
                  <button className="border border-black w-10 h-10 rounded-full bg-fuchsia-500 flex justify-center items-center"></button>
                </div>
                <div className="flex flex-col mt-12">
                  <button
                    className="ml-4 mb-4"
                    onClick={() => setIsColorsPallete(false)}
                  >
                    Back
                  </button>
                  <button className="ml-4">Save</button>
                </div>
              </div>
            ) : null}
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl mb-64">
              Hey, {storedUserData.name}.
            </h2>
            <button onClick={logoutAccount}>Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

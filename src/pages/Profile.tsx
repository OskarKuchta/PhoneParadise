import { FC } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/LoginSlice";
import { useNavigate } from "react-router";
const Profile: FC = () => {
  const storedUserData = useSelector(
    (state: RootState) => state.login.userData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAccount = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <main>
      <div className="flex flex-col items-center mt-[10vh]  lg:py-0">
        <div className="w-[90vw] bg-white rounded-lg shadow md:mt-0 xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="border border-black w-16 h-16 rounded-full bg-emerald-500 flex justify-center items-center">
              <span>{storedUserData.name.slice(0, 1)}</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-purple md:text-2xl mb-64">
              Hey, Oska98.
            </h2>
            <button onClick={logoutAccount}>Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
